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
import { OssSurveyData, UserData } from "../entities";
import { API_MESSAGES } from "../utils/constants";
import { getStudentDetailsWithTypeWise } from "../utils/sats/childData";
import { OtpServices } from "../sms/smsServceResusable";
import { RESPONSEMSG } from "../utils/statusCodes";
import { fetchDataFromKutumba } from "../utils/kutumba/kutumbaData";


function updateOrAddMembers(existingMembers, newMembers) {
    let sampleData = existingMembers[0];
    newMembers.forEach(newMember => {
        const existingIndex = existingMembers.findIndex(member => member.RC_NUMBER === newMember.RCNumber && member.MEMBER_ID === newMember.StudentMemberId);
        if (existingIndex !== -1) {
            let existMem = existingMembers[existingIndex];
            existingMembers[existingIndex] = {
                MBR_CASTE_CATEGORY: newMember?.Category || "",
                MBR_EDUCATION_ID: newMember?.StudentId || "",
                FAMILY_ID: existMem.FAMILY_ID || "",
                FCS_DISTRICT_NAME: existMem.FCS_DISTRICT_NAME || "",
                MEMBER_ID: newMember?.StudentMemberId || "",
                FCS_DISTRICT_CODE: existMem.FCS_DISTRICT_CODE || "",
                FCS_GP_CODE: existMem.FCS_GP_CODE || "",
                FCS_GP_NAME: existMem.FCS_GP_NAME || "",
                FCS_TALUK_CODE: existMem.FCS_TALUK_CODE || "",
                FCS_TALUK_NAME: existMem.FCS_TALUK_NAME || "",
                FCS_VILLAGE_CODE: existMem.FCS_VILLAGE_CODE || "",
                FCS_VILLAGE_NAME: existMem.FCS_VILLAGE_NAME || "",
                LGD_DISTRICT_CODE: existMem.LGD_DISTRICT_CODE || "",
                LGD_DISTRICT_Name: existMem.LGD_DISTRICT_Name || "",
                LGD_TALUK_CODE: existMem.LGD_TALUK_CODE || "",
                LGD_TALUK_Name: existMem.LGD_TALUK_Name || "",
                LGD_VILLAGE_CODE: existMem.LGD_VILLAGE_CODE || "",
                LGD_VILLAGE_Name: existMem.LGD_VILLAGE_Name || "",
                MBR_AADHAR_NO: existMem.MBR_AADHAR_NO || "",
                MBR_RCAREA: existMem.MBR_RCAREA || "",
                MEMBER_NAME_ENG: newMember?.StudentName || "",
                RC_NUMBER: newMember?.RCNumber || "",
                RC_STATUS: existMem.RC_STATUS || "",
                RC_TYPE: existMem.RC_TYPE || "",
                RELATION_NAME: newMember?.StudentRelation || "",
                MBR_DOB: newMember?.StudentDob || "",
                MBR_GENDER: newMember?.StudentGender || "",
                MEMBER_NAME_KAN: existMem.MEMBER_NAME_KAN || "",
                MBR_PINCODE: existMem.MBR_PINCODE || "",
                MBR_ADDRESS: newMember?.ParentAddress || "",
                MBR_HASH_AADHAR: newMember?.StudentAadharHash || "",
                Kutumba_ID_status: "",
                Status: newMember?.Status || ""
            };
        } else {
            let newMemberObj = {
                MBR_CASTE_CATEGORY: newMember?.Category || "",
                MBR_EDUCATION_ID: newMember?.StudentId || "",
                FAMILY_ID: sampleData.FAMILY_ID || "",
                FCS_DISTRICT_NAME: sampleData.FCS_DISTRICT_NAME || "",
                MEMBER_ID: newMember?.StudentMemberId || "",
                FCS_DISTRICT_CODE: sampleData.FCS_DISTRICT_CODE || "",
                FCS_GP_CODE: sampleData.FCS_GP_CODE || "",
                FCS_GP_NAME: sampleData.FCS_GP_NAME || "",
                FCS_TALUK_CODE: sampleData.FCS_TALUK_CODE || "",
                FCS_TALUK_NAME: sampleData.FCS_TALUK_NAME || "",
                FCS_VILLAGE_CODE: sampleData.FCS_VILLAGE_CODE || "",
                FCS_VILLAGE_NAME: sampleData.FCS_VILLAGE_NAME || "",
                LGD_DISTRICT_CODE: sampleData.LGD_DISTRICT_CODE || "",
                LGD_DISTRICT_Name: sampleData.LGD_DISTRICT_Name || "",
                LGD_TALUK_CODE: sampleData.LGD_TALUK_CODE || "",
                LGD_TALUK_Name: sampleData.LGD_TALUK_Name || "",
                LGD_VILLAGE_CODE: sampleData.LGD_VILLAGE_CODE || "",
                LGD_VILLAGE_Name: sampleData.LGD_VILLAGE_Name || "",
                MBR_AADHAR_NO: sampleData.MBR_AADHAR_NO || "",
                MBR_RCAREA: sampleData.MBR_RCAREA || "",
                MEMBER_NAME_ENG: newMember?.StudentName || "",
                RC_NUMBER: newMember?.RCNumber || "",
                RC_STATUS: sampleData.RC_STATUS || "",
                RC_TYPE: sampleData.RC_TYPE || "",
                RELATION_NAME: newMember?.StudentRelation || "",
                MBR_DOB: newMember?.StudentDob || "",
                MBR_GENDER: newMember?.StudentGender || "",
                MEMBER_NAME_KAN: sampleData.MEMBER_NAME_KAN || "",
                MBR_PINCODE: sampleData.MBR_PINCODE || "",
                MBR_ADDRESS: newMember?.ParentAddress || "",
                MBR_HASH_AADHAR: newMember?.StudentAadharHash || "",
                Kutumba_ID_status: "",
                Status: newMember?.Status || ""
            };
            existingMembers.push(newMemberObj);
        }
    });
    return existingMembers;
}

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
        // data.Otp = generateOTP(4);
        data.Otp = "1111";
        data.Token = generateRandomString(40);
        data.Version = version[0]?.Version;
        data.TokenExpirationTime = generateEOfTTime();
        let checkUserData = await this.userRepo.sendOtp(data);
        if (checkUserData?.code) return checkUserData;
        // let sendSingleSms = await this.otpServices.sendOtpAsSingleSms(
        //     Mobile,
        //     data?.Otp
        // );
        // await saveMobileOtps(
        //     Mobile,
        //     sendSingleSms?.otpMessage,
        //     sendSingleSms?.response,
        //     data?.UserId,
        //     data?.Otp
        // );
        // if (sendSingleSms.code !== 200) {
        //     return { code: 422, message: RESPONSEMSG.OTP_FAILED };
        // }
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
    async justForCheckingSatsApi(data) {
        let getUserDetails = await getStudentDetailsWithTypeWise(data);
        return getUserDetails;
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

    async checkSats(data) {
        const { type, rollNo } = data;
        if (!type || !rollNo)
            return { code: 400, message: "Type and RollNo not provided" };
        let getUserDetails = await getStudentDetailsWithTypeWise(data);
        return getUserDetails;
    }

    async getKutumbaData(data) {
        const { rc, aadhar } = data;
        if(rc) {
        let getUserDetails = await fetchDataFromKutumba(data);
        if (!Array.isArray(getUserDetails))
            return { code: 422, message: getUserDetails?.StatusText };
        for (let i = 0; i < getUserDetails.length; i++) {
            await this.userRepo.saveKutumbaData(getUserDetails[i]);
        };
        return await this.userRepo.getKutumbaData(rc);
    } else {
        let getUserDetails = await fetchDataFromKutumba(data);
        if (!Array.isArray(getUserDetails))
            return { code: 422, message: getUserDetails?.StatusText };
        for (let i = 0; i < getUserDetails.length; i++) {
            await this.userRepo.saveKutumbaData(getUserDetails[i]);
        };
        return getUserDetails;
    }
    };

    async checkKutumba(data) {
        let getUserDetails = await fetchDataFromKutumba(data);
        return getUserDetails;
    };

    async getDataModesWise(data) {
        const { Rc, SurveyMode, ParentAadhar, StudentId, type, ParentMobile } = data;
        if (!SurveyMode)
            return { code: 400, message: "Provide SurveyMode." };
        if (SurveyMode == "Ration") {
            if (!Rc)
                return { code: 400, message: "Provided RcNo." };
            let { fetchKutumba, fetchOss } = await this.userRepo.checkRcDeatils(Rc);
            if (fetchKutumba.length > 0 && fetchOss.length > 0) {
                let mappedData = updateOrAddMembers(fetchKutumba, fetchOss);
                return mappedData;
            }
            let getUserDetails = await fetchDataFromKutumba({ rc: data?.Rc });
            if (!Array.isArray(getUserDetails))
                return { code: 422, message: getUserDetails?.StatusText };
            for (let i = 0; i < getUserDetails.length; i++) {
                await this.userRepo.saveKutumbaData(getUserDetails[i]);
            }
            return await this.userRepo.getKutumbaData(Rc);
        } else if (SurveyMode === "Aadhar") {
            if (!ParentAadhar)
                return { code: 400, message: "Provide ParentAadhar." };
            let checkAadhar = await this.userRepo.checkAadharSurveyData(ParentAadhar);
            if (checkAadhar && checkAadhar.Status === "Verified")
                return { code: 400, message: "Already Registered." };
            return [];
        } else if (SurveyMode === "SatsId") {
            if (!StudentId)
                return { code: 400, message: "Provide StudentId." };
            if (StudentId) {
                let checkStudentData = await this.userRepo.checkStudentExists(StudentId);
                if (checkStudentData && checkStudentData?.Status === "Verified")
                    return { code: 422, message: "Already Registered." };
                let getUserDetails = await getStudentDetailsWithTypeWise(data);
                if (getUserDetails?.code)
                    return getUserDetails;
                if (type == "S") {
                    let newFormateSavingData = assignResToTableFormate(getUserDetails);
                    newFormateSavingData.DataType = "Sats";
                    newFormateSavingData.UserId = data?.UserId;
                    newFormateSavingData.StudentId = StudentId;
                    return await this.userRepo.saveDataInStudentAndSchoolAsSats(newFormateSavingData);
                }
                return [];
            }
            return [];
        } else if (SurveyMode === "NoId") {
            if (ParentMobile)
                return { code: 400, message: "Provide ParentMobile." };
            let getMobileData = await this.userRepo.fecthMobileBasedData(ParentMobile);
            if (getMobileData.length > 0)
                return { code: 400, message: "Already Registered." };
            return [];
        } else {
            return [];
        }
    }

    async getDbCounts(data) {
        let pending = await this.userRepo.getPendingCounts(data);
        let completed = await this.userRepo.getCompletedCounts(data);
        return {
            pending,
            completed
        };
    };

    async getListWise(data) {
        if (!data?.Status) return { code: 400, message: "Provided Status" };
        let getList = await this.userRepo.getListWise(data);
        return getList;
    };

    async getEachList(data) {
        if (!data?.id) return { code: 400, message: "Provided Id" };
        let getList = await this.userRepo.getEachList(data);
        return getList;
    };

    async saveOssSurvey(data) {
        const { StudentMemberId, RCNumber, StudentId, SurveyMode, ParentMobile, ParentAadhar } = data;
        if (!SurveyMode)
            return { code: 400, message: "Provide SurveyMode." };

        if (StudentId) {
            let checkStudentData = await this.userRepo.checkStudentExists(StudentId);
            if (checkStudentData && checkStudentData?.Status === "Verified")
                return { code: 422, message: "Already Registered." };
        }

        if (SurveyMode === "Ration") {
            if (!RCNumber)
                return { code: 400, message: "Provide RcNumber." };
            if (!StudentMemberId)
                return { code: 400, message: "Provided StudentMemberId." };
            if (StudentMemberId) {
                let checkStudentData = await this.userRepo.checkMemberId(StudentMemberId, RCNumber);
                if (checkStudentData && checkStudentData?.Status === "Verified")
                    return { code: 422, message: "Already Registered." };
            }
            return await this.userRepo.saveSurveyWithRcAndMember(data);
        } else if (SurveyMode === "Aadhar") {
            if (!ParentAadhar)
                return { code: 400, message: "Provide ParentAadhar." };
            return await this.userRepo.saveSurveyData(data);
        } else if (SurveyMode === "SatsId") {
            if (!StudentId)
                return { code: 400, message: "Provide StudentId." };
            return await this.userRepo.saveSurveyWithSats(data);
        } else if (SurveyMode === "NoId") {
            if (!ParentMobile) return { code: 400, message: "Provide ParentMobile." };
            return await this.userRepo.saveSurveyData(data);
        } else {
            return [];
        };
    };

    async saveOssSurveyForHousehold(data) {
        const { MemberId, RCNumber, SurveyMode, ParentAadhar, ParentMobile, StudentId } = data;
        if (SurveyMode === "Ration") {
            if (!RCNumber)
                return { code: 400, message: "Provided RCNumber." };
            if (!MemberId)
                return { code: 400, message: "Provide MemberId." };
            let checkRc = await this.userRepo.checkRcInHouseHold(data);
            if (checkRc)
                return { code: 422, message: "Already Registered." };
            return await this.userRepo.saveSurveyHouseHoldData(data);
        } else if (SurveyMode === "Aadhar") {
            if (!ParentAadhar)
                return { code: 400, message: "Provided ParentAadhar." };
            let checkAadhar = await this.userRepo.checkAadharInHouseHold(ParentAadhar);
            if (checkAadhar)
                return { code: 422, message: "Already Registered." };
            return await this.userRepo.saveSurveyHouseHoldData(data);
        } else if (SurveyMode === "SatsId") {
            if (!StudentId)
                return { code: 400, message: "Provided StudentId." };
            let checkStudentId = await this.userRepo.checkSatsInHouseHold(StudentId);
            if (checkStudentId)
                return { code: 422, message: "Already Registered." };
            return [];
        } else if (SurveyMode === "NoId") {
            if (!ParentMobile)
                return { code: 400, message: "Provided ParentMobile." };
            let checkMobile = await this.userRepo.checkMobileInHouseHold(ParentMobile);
            if (checkMobile)
                return { code: 422, message: "Already Registered." };
            return await this.userRepo.saveSurveyHouseHoldData(data);
        } else {
            return [];
        }
    }

}
