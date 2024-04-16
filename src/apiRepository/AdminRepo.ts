import { Service } from 'typedi';
import { AppDataSource } from '../db/config';
import { Admin, Code, Equal } from 'typeorm';
import { AssignedData, UserData } from '../entities';
import { expandCodeParameters } from '../utils/resuableCode';

const adminRepo = AppDataSource.getRepository(Admin);
const assignedDataRepo = AppDataSource.getRepository(AssignedData);
const userDataRepo = AppDataSource.getRepository(UserData);
@Service()
export class AdminRepo {

    async checkRoleInAdmin (Mobile) {
        let dbRes = await adminRepo.find(Mobile);
        return dbRes;
    };

    async addSurveyRoles(data) {
        return await userDataRepo.save(data);
      };

    async checkRoleInAssigned (data) {
        const { Mobile } = data;
        let dbRes = await assignedDataRepo.find(
            {where: [{Mobile: Equal(Mobile)}, {TalukOfficerMobile: Equal(Mobile)}, {GpOfficerMobile: Equal(Mobile)}],
            select: ['DistrictCode', 'TalukCode', 'GpOrWard', 'AssigningType']
        });
        return dbRes;
    }
    async updateLoginOtp (Mobile, Otp) {
        let dbRes = await assignedDataRepo.findOneBy({Mobile});
        let newData = {...dbRes, ...{Otp}};
        return assignedDataRepo.save(newData);
    }
    async assignToDistrict(data) {
        const { DistrictCode } = data;
        let findData = await assignedDataRepo.findOneBy({DistrictCode});
        let newData = {...findData, ...data};
        return assignedDataRepo.save(newData);
    }
    async assignToTaluk (data) {
        const { TalukCode } = data;
        let findData = await assignedDataRepo.findOneBy({TalukCode});
        let newData = {...findData, ...data};
        return assignedDataRepo.save(newData);
    };

    async assignToGp (data) {
        const { GpOrWard } = data;
        let findData = await assignedDataRepo.findOneBy({GpOrWard});
        let newData = {...findData, ...data};
        return assignedDataRepo.save(newData);
    };

    async assignToVillages (data) {
        const { id } = data;
        let findData = await userDataRepo.findOneBy({id});
        let newData = {...findData, ...data};
        return userDataRepo.save(newData);
    };

    async saveNewGpUser (data) {
        return userDataRepo.save(data);
    };
    async getMasterWithAssigned (data) {
        const { LoginType, Codes=[], DataType="UnAssign" } = data;
        let query = `execute getMasterWithAssigned @0,@1,@2,@3,@4,@5,@6,@7,@8,@9,@10,@11`;
        let expandCodesParams = expandCodeParameters(LoginType, DataType, Codes);
        return await AppDataSource.query(query, expandCodesParams);
    }
};