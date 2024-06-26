import { Service } from "typedi";
import { AdminRepo } from "../apiRepository/AdminRepo";
import { OtpServices } from "../sms/smsServceResusable";
import { generateOTP, generateUniqueId, saveMobileOtps } from "../utils/resuableCode";
import { RESPONSEMSG } from "../utils/statusCodes";
import { BBMP_OFFICER, DISTRICT_OFFICER, DIVISION_OFFICER, GP_OFFICER, TALUK_OFFICER, ZONE_OFFICER } from "../utils/constants";


@Service()
export class AdminServices {
    constructor(
        public adminRepo: AdminRepo,
        public otpServices: OtpServices
    ) { };

    async addSurveyRoles(data) {
        return await this.adminRepo.addSurveyRoles(data);
    };

    async sendOtpAndCheckRole(data) {
        const { Mobile } = data;
        if (!Mobile) return { code: 400, message: "Provide Mobile." };
        if (Mobile.length < 10 || Mobile.length > 10) return { code: 400, message: "Mobile Number length should be proper." };
        data.Otp = generateOTP(4);
        let checkInAssigned = await this.adminRepo.checkRoleInAssigned(data);
        if (!checkInAssigned) return { code: 422, message: "Data does't exists." };
        let sendMessage = await this.otpServices.sendOtpAsSingleSms(Mobile, data.Otp);
        await saveMobileOtps(Mobile, sendMessage?.otpMessage, sendMessage?.response, data?.UserId, data?.Otp);
        if (sendMessage.code !== 200) {
            return { code: 422, message: RESPONSEMSG.OTP_FAILED };
        };
        await this.adminRepo.updateLoginOtp(Mobile, data?.Otp);
        return {
            Otp: data?.Otp,
            Mobile: Mobile,
            assignedData: checkInAssigned
        };
    };

    async assignMentProcess(data) {
        console.log("data", data);
        const { Mobile, Name, AssigningType, TalukOfficerMobile, TalukOfficerName, GpOfficerMobile, GpOfficerName } = data;
        if (!AssigningType) return { code: 400, message: "Provide AssigningType." };
        if (AssigningType == DISTRICT_OFFICER || AssigningType == BBMP_OFFICER) {
            if (!Mobile) return { code: 400, message: "Provide Mobile." };
            if (!Name) return { code: 400, message: "Provide Name." };
            if (Mobile.length < 10 || Mobile.length > 10) return { code: 400, message: "Mobile Number length should be proper." };
            return await this.adminRepo.assignToDistrict(data);
        } else if (AssigningType == TALUK_OFFICER || AssigningType == ZONE_OFFICER) {
            if (!TalukOfficerMobile) return { code: 400, message: "Provide TalukOfficerMobile." };
            if (!TalukOfficerName) return { code: 400, message: "Provide TalukOfficerName." };
            if (TalukOfficerMobile.length < 10 || TalukOfficerMobile.length > 10) return { code: 400, message: "Mobile Number length should be proper." };
            return await this.adminRepo.assignToTaluk(data);
        } else if (AssigningType == GP_OFFICER || AssigningType == DIVISION_OFFICER) {
            if (!GpOfficerMobile) return { code: 400, message: "Provide GpOfficerMobile." };
            if (!GpOfficerName) return { code: 400, message: "Provide GpOfficerName." };
            if (GpOfficerMobile.length < 10 || GpOfficerMobile.length > 10) return { code: 400, message: "Mobile Number length should be proper." };
            return await this.adminRepo.assignToGp(data);
        } else {
            return await this.adminRepo.assignToVillages(data);
        }
    };

    async assignToSurveyUser(data){
        data.UserId = generateUniqueId();
        return await this.adminRepo.saveNewGpUser(data); 
    }

    async getMasterWithAssigned(data) {
        const { LoginType } = data;
        if (!LoginType) return { code: 400, message: "Provide LoginType." };
        return await this.adminRepo.getMasterWithAssigned(data);
    };

};