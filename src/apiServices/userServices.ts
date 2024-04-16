import { Service } from "typedi";
import { UserRepo } from "../apiRepository/userRepo";
import {
    assignResToTableFormate,
    generateEOfTTime,
    generateOTP,
    generateRandomString,
    generateUniqueId,
    saveMobileOtps,
} from "../utils/resuableCode";
import { UserData } from "../entities";
import { API_MESSAGES } from "../utils/constants";
import { getStudentDetailsWithTypeWise } from "../utils/sats/childData";
import { OtpServices } from "../sms/smsServceResusable";
import { RESPONSEMSG } from "../utils/statusCodes";
import { fetchDataFromKutumba } from "../utils/kutumba/kutumbaData";

@Service()
export class UserServices {
    constructor(public userRepo: UserRepo, public otpServices: OtpServices) { }

    async addUser(data: UserData) {
        const { Mobile } = data;
        if (!Mobile) return { code: 400 };
        data.UserId = await generateUniqueId();
        let checkUserData = await this.userRepo.addUser(data);
        return checkUserData;
    }

    async sendOtp(data: UserData) {
        const { Mobile } = data;
        if (!Mobile) return { code: 400 };
        let version: any = await this.userRepo.getVersionOfApp();
        if (version?.code) return version;
        data.Otp = generateOTP(4);
        data.Token = generateRandomString(40);
        data.Version = version[0]?.Version;
        data.TokenExpirationTime = generateEOfTTime();
        let checkUserData = await this.userRepo.sendOtp(data);
        if (checkUserData?.code) return checkUserData;
        let sendSingleSms = await this.otpServices.sendOtpAsSingleSms(
            Mobile,
            data?.Otp
        );
        await saveMobileOtps(
            Mobile,
            sendSingleSms?.otpMessage,
            sendSingleSms?.response,
            data?.UserId,
            data?.Otp
        );
        if (sendSingleSms.code !== 200) {
            return { code: 422, message: RESPONSEMSG.OTP_FAILED };
        }
        let getData = await this.userRepo.getUsersList(Mobile);
        return {
            Version: checkUserData?.Version,
            Otp: data?.Otp,
            UsersList: getData,
        };
    }

    async verifyOtp(data: UserData) {
        const { UserId, Otp } = data;
        if (!UserId) return { code: 400, message: "User id not provided." };
        let getUserDetails = await this.userRepo.getUserDataById(data.UserId);
        let checkOtp = getUserDetails.Otp == Otp;
        if (!checkOtp)
            return { code: 422, message: API_MESSAGES.VERIFICATION_FAILED };
        return { message: API_MESSAGES.VERIFICATION_SUCCESS, data: {} };
    }

    async getChildDataWithSatsId(data) {
        const { type, rollNo } = data;
        if (!type || !rollNo)
            return { code: 400, message: "Type and RollNo not provided" };
        let getUserDetails = await getStudentDetailsWithTypeWise(data);
        if (getUserDetails?.code) return getUserDetails;
        if (type == "S") {
            let checkStudent = await this.userRepo.checkStudentExists(rollNo);
            if (checkStudent && checkStudent?.Status == "Completed")
                return { code: 422, message: "Already Registered." };
            let newFormateSavingData = assignResToTableFormate(getUserDetails);
            newFormateSavingData.DataType = "Sats";
            newFormateSavingData.UserId = data?.UserId;
            newFormateSavingData.StudentId = rollNo;
            console.log(newFormateSavingData);
            return await this.userRepo.saveDataInStudentAndSchoolAsSats(
                newFormateSavingData
            );
        } else {
            let checkStudent = await this.userRepo.checkStudentExists(getUserDetails?.applicantDetails?.child_enroll_no);
            if (checkStudent && checkStudent?.Status == "Completed")
                return { code: 422, message: "Already Registered." };
            let newFormateSavingData = assignResToTableFormate(getUserDetails);
            newFormateSavingData.AadharHash = rollNo;
            newFormateSavingData.DataType = "Aadhar";
            newFormateSavingData.UserId = data?.UserId;
            newFormateSavingData.StudentId = getUserDetails?.applicantDetails?.child_enroll_no;
            return await this.userRepo.saveDataInStudentAndSchoolAsSats(
                newFormateSavingData
            );
        }
    }

    async getKutumbaData(data) {
        const { rc } = data;
        if (!rc) return { code: 400, message: "Rc not provided." };
        let getUserDetails = await fetchDataFromKutumba(data);
        if (!Array.isArray(getUserDetails))
            return { code: 422, message: getUserDetails?.StatusText };
        for (let i = 0; i < getUserDetails.length; i++) {
            await this.userRepo.saveKutumbaData(getUserDetails[i]);
        }
        return await this.userRepo.getKutumbaData(rc);
    }

    async saveOssSurvey(data) {
        const { StudentMemberId, RCNumber, StudentId, SurveyMode } =
            data;
        if (!StudentMemberId) return { code: 400, message: "Provided StudentMemberId." };
        if (!RCNumber) return { code: 400, message: "Provide RcNumber." };
        if (!StudentId)
            return {
                code: 400,
                message: "Provided StudentId.",
            };
        if (!SurveyMode) return { code: 400, message: "SurveyMode not provided." };
        let checkStudentId = await this.userRepo.checkStudentExists(StudentId);
        if (checkStudentId && checkStudentId.Status === "Completed")
            return { code: 422, message: "Already Registered." };
        return await this.userRepo.saveSurveyData(data);
    };

    async saveOssSurveyForHousehold(data) {
        const { MemberId, RCNumber } =
            data;
        if (!RCNumber) return { code: 400, message: "Provided RCNumber." };
        if (!MemberId) return { code: 400, message: "Provide MemberId." };
        let checkStudentId = await this.userRepo.checkHouseHoldExists(data);
        if (checkStudentId) return { code: 422, message: "Already Registered." };
        return await this.userRepo.saveSurveyHouseHoldData(data);
    };

    async sendBulkMsgs(data) {
        return await this.otpServices.sendOnlyBulkMsgs(data?.MOBILE, data?.SMS);
    }
}
