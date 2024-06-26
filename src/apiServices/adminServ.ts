import { Service } from "typedi";
import { AdminRepo } from "../apiRepository/AdminRepo";
import { OtpServices } from "../sms/smsServceResusable";
import { generateOTP, generateUniqueId, saveMobileOtps } from "../utils/resuableCode";
import { RESPONSEMSG } from "../utils/statusCodes";
import { BBMP_OFFICER, DISTRICT_OFFICER, DIVISION_OFFICER, GP_OFFICER, TALUK_OFFICER, ZONE_OFFICER } from "../utils/constants";
import { AssigningMasters } from "../entities";


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
        data.Otp = '1111';
        let checkInAssigned = await this.adminRepo.checkRoleInAssigned(data);
        if (checkInAssigned?.length == 0) return { code: 422, message: "Data does't exists." };
        // let sendMessage = await this.otpServices.sendOtpAsSingleSms(Mobile, data.Otp);
        // await saveMobileOtps(Mobile, sendMessage?.otpMessage, sendMessage?.response, data?.UserId, data?.Otp);
        // if (sendMessage.code !== 200) {
        //     return { code: 422, message: RESPONSEMSG.OTP_FAILED };
        // };
        await this.adminRepo.updateLoginOtp(Mobile, data?.Otp);
        return {
            Otp: data?.Otp,
            Mobile: Mobile,
            assignedData: checkInAssigned
        };
    };

    async assignMentProcess(data) {
        const { Mobile, Name, ListType } = data;
        if (!ListType) return { code: 400, message: "Provide ListType." };
        if (!Mobile) return { code: 400, message: "Provide Mobile." };
        if (!Name) return { code: 400, message: "Provide Name." };
        if (Mobile.length < 10 || Mobile.length > 10) return { code: 400, message: "Mobile Number length should be proper." };
        if (ListType == "District" || ListType == "Taluk" || ListType == "Gp") {
            return await this.adminRepo.assigningToEachMaster(data);
        } else {
            data.UserId = generateUniqueId();
            return await this.adminRepo.assignToSurveyor(data);
        }
    };

    async assignToMasterAndRoles(data) {
        const { Mobile, Name, DistrictCode, TalukCode, GpCode, VillageCode } = data;
        if (!DistrictCode) return { code: 400, message: "Provide DistrictCode." };
        if (!TalukCode) return { code: 400, message: "Provide TalukCode." };
        if (!GpCode) return { code: 400, message: "Provide GpCode." };
        if (!VillageCode) return { code: 400, message: "Provide VillageCode." };
        if (!Mobile) return { code: 400, message: "Provide Mobile." };
        if (!Name) return { code: 400, message: "Provide Name." };
        if (Mobile.length < 10 || Mobile.length > 10) return { code: 400, message: "Mobile Number length should be proper." };
        await this.adminRepo.updateGpInMaster(data);
        return await this.adminRepo.assigningToEachMaster(data);
    };

    // async getAllWithCode(data) {
    //     const { ListType } = data;
    //     if (ListType == "District") {
    //         return await this.adminRepo.fetchDistrictAssigned(data);
    //     } else if (ListType == "Taluk") {
    //         return await this.adminRepo.fetchTalukAssigned(data);
    //     } else if (ListType == "Gp") {
    //         return await this.adminRepo.fetchGpAssigned(data);
    //     } else if (ListType == "User") {
    //         return await this.adminRepo.fetchSurveyorData(data);
    //     }
    // };
    async getAllWithCode(data) {
        const { ListType } = data;
        if (ListType == "District") {
            return await this.adminRepo.fetchDistrictAssigned(data);
        } else if (ListType == "Taluk") {
            return await this.adminRepo.fetchTalukAssigned(data);
        } else if (ListType == "Gp") {
            return await this.adminRepo.fetchGpAssigned(data);
        } else if (ListType == "User") {
            return await this.adminRepo.fetchSurveyorData(data);
        } else if (ListType == "Approval") {
            return await this.adminRepo.fetchApporvalData(data);
        }
    };

    async assignToSurveyUser(data) {
        data.UserId = generateUniqueId();
        return await this.adminRepo.saveNewGpUser(data);
    }

    async getMasterWithAssigned(data) {
        const { LoginType } = data;
        if (!LoginType) return { code: 400, message: "Provide LoginType." };
        return await this.adminRepo.getMasterWithAssigned(data);
    };

    async getStagesWiseData(data) {
        const { DataType } = data;
        if (!DataType) return { code: 400, message: "Provide DataType." };
        return await this.adminRepo.getStagesWiseData(data);
    };

    /* new services api */


    async checkRoleAndSendOtp(data) {
        const { Mobile } = data;
        if (!Mobile) return { code: 400, message: "Provide Mobile." };
        if (Mobile.length < 10 || Mobile.length > 10) return { code: 400, message: "Mobile number length should be 10." };
        // data.Otp = generateOTP(4);
        data.Otp = '1111';
        let checkInAssigned = await this.adminRepo.checkRolesWithMobile(data);
        if (checkInAssigned?.length == 0) return { code: 422, message: "Data does't exists." };
        // let sendMessage = await this.otpServices.sendOtpAsSingleSms(Mobile, data.Otp);
        // await saveMobileOtps(Mobile, sendMessage?.otpMessage, sendMessage?.response, data?.UserId, data?.Otp);
        // if (sendMessage.code !== 200) {
        //     return { code: 422, message: RESPONSEMSG.OTP_FAILED };
        // };
        await this.adminRepo.updateAssignedMasters(Mobile, data?.Otp);
        return {
            Otp: data?.Otp,
            Mobile: Mobile,
            assignedData: checkInAssigned
        };
    };

    async getRolesAndAccessData(data) {
        const { RoleId } = data;
        if (!RoleId) return { code: 400, message: "Provide RoleId." };
        return await this.adminRepo.fetchRolesAndAccess(data);
    }

    // async assignMentProcess(data) {
    //     console.log("data", data);
    //     const { Mobile, Name, AssigningType, TalukOfficerMobile, TalukOfficerName, GpOfficerMobile, GpOfficerName } = data;
    //     if (AssigningType == DISTRICT_OFFICER || AssigningType == BBMP_OFFICER) {
    //         if (!AssigningType) return { code: 400, message: "Provide AssigningType." };
    //         if (!Mobile) return { code: 400, message: "Provide Mobile." };
    //         if (!Name) return { code: 400, message: "Provide Name." };
    //         if (Mobile.length < 10 || Mobile.length > 10) return { code: 400, message: "Mobile Number length should be proper." };
    //         return await this.adminRepo.assignToDistrict(data);
    //     } else if (AssigningType == TALUK_OFFICER || AssigningType == ZONE_OFFICER) {
    //         if (!AssigningType) return { code: 400, message: "Provide AssigningType." };
    //         if (!TalukOfficerMobile) return { code: 400, message: "Provide TalukOfficerMobile." };
    //         if (!TalukOfficerName) return { code: 400, message: "Provide TalukOfficerName." };
    //         if (TalukOfficerMobile.length < 10 || TalukOfficerMobile.length > 10) return { code: 400, message: "Mobile Number length should be proper." };
    //         return await this.adminRepo.assignToTaluk(data);
    //     } else if (AssigningType == GP_OFFICER || AssigningType == DIVISION_OFFICER) {
    //         if (!AssigningType) return { code: 400, message: "Provide AssigningType." };
    //         if (!GpOfficerMobile) return { code: 400, message: "Provide GpOfficerMobile." };
    //         if (!GpOfficerName) return { code: 400, message: "Provide GpOfficerName." };
    //         if (GpOfficerMobile.length < 10 || GpOfficerMobile.length > 10) return { code: 400, message: "Mobile Number length should be proper." };
    //         return await this.adminRepo.assignToGp(data);
    //     } else {
    //         return await this.adminRepo.assignToVillages(data);
    //     }
    // };

    async roleAssignment(data) {
        const { DataType } = data;
        if (DataType == 'role') {
            return await this.adminRepo.findRoleHierarchy(data);
        } else if (DataType == 'access') {
            return await this.adminRepo.findAccess(data);
        } else {
            return await this.adminRepo.findRoles(data);
        }
    };

    async AssignRoles(data) {
        const { DataType } = data;
        if (DataType == 'role') {
            return await this.adminRepo.saveRoleHierarchy(data);
        } else if (DataType == 'access') {
            return await this.adminRepo.saveAccess(data);
        } else {
            return await this.adminRepo.saveRoles(data);
        }
    };

    async deleteRoles(data) {
        const { DataType, id } = data;
        if (DataType == 'role') {
            return await this.adminRepo.deleteRoleHierarchy(id);
        } else if (DataType == 'access') {
            return await this.adminRepo.deleteAccess(id);
        } else {
            return await this.adminRepo.deleteRoles(id);
        }
    };
};