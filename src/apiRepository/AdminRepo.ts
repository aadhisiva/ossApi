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

    async checkRoleInAdmin(Mobile) {
        let dbRes = await adminRepo.find(Mobile);
        return dbRes;
    };

    async addSurveyRoles(data) {
        return await userDataRepo.save(data);
    };

    async checkRoleInAssigned(data) {
        const { Mobile } = data;
        let dbRes = await assignedDataRepo.find(
            {
                where: [{ Mobile: Equal(Mobile) }, { TalukOfficerMobile: Equal(Mobile) }, { GpOfficerMobile: Equal(Mobile) }],
                select: ['DistrictCode', 'TalukCode', 'GpOrWard', 'AssigningType']
            });
        return dbRes;
    }
    async updateLoginOtp(Mobile, Otp) {
        let dbRes = await assignedDataRepo.findOneBy({ Mobile: Equal(Mobile) });
        let newData = { ...dbRes, ...{ Otp } };
        return assignedDataRepo.save(newData);
    }
    async assignToDistrict(data) {
        const { id } = data;
        let findData = await assignedDataRepo.findOneBy({ id: Equal(id) });
        let newData = { ...findData, ...data };
        return assignedDataRepo.save(newData);
    }
    async assignToTaluk(data) {
        const { id } = data;
        let findData = await assignedDataRepo.findOneBy({ id: Equal(id) });
        let newData = { ...findData, ...data };
        return assignedDataRepo.save(newData);
    };

    async assignToGp(data) {
        const { id } = data;
        let findData = await assignedDataRepo.findOneBy({ id: Equal(id) });
        let newData = { ...findData, ...data };
        return assignedDataRepo.save(newData);
    };

    async assignToVillages(data) {
        const { id } = data;
        let findData = await userDataRepo.findOneBy({ id: Equal(id) });
        let newData = { ...findData, ...data };
        return userDataRepo.save(newData);
    };

    async fetchDistrictAssigned(data) {
        const { DistrictCode } = data;
        return await assignedDataRepo.find({ where: { DistrictCode: Equal(DistrictCode) } });
    }
    async fetchTalukAssigned(data) {
        const { DistrictCode, TalukCode } = data;
        return await assignedDataRepo.createQueryBuilder('s')
        .select(["s.TalukOfficerName as Name", "s.TalukOfficerMobile as Mobile", "s.id as id", "s.AssigningType as AssigningType"])
        .where("s.DistrictCode= :dcode and s.TalukCode= :tcode and s.ListType= :list", { dcode: DistrictCode, tcode: TalukCode, list: "Taluk" })
        .getRawMany();
    }
    async fetchGpAssigned(data) {
        const { TalukCode, GpOrWard, DistrictCode } = data;
        return await assignedDataRepo.createQueryBuilder('s')
        .select(["s.GpOfficerName as Name", "s.GpOfficerMobile as Mobile", "s.id as id", "s.AssigningType as AssigningType"])
        .where("s.DistrictCode= :dcode and s.TalukCode= :tcode and s.GpOrWard= :gpcode and s.ListType= :list", { dcode: DistrictCode, tcode: TalukCode, gpcode: GpOrWard, list: "Taluk" })
        .getRawMany();
    };
    async fetchSurveyorData(data) {
        const { TalukCode, GpOrWard, DistrictCode, VillageCode } = data;
        return await userDataRepo.createQueryBuilder('s')
        .select(["s.Name as Name", "s.Mobile as Mobile", "s.id as id", "s.Role as Role"])
        .where("s.DistrictCode= :dcode and s.TalukCode= :tcode and s.GpOrWard= :gpcode and s.VillageCode= :vcode", 
        { dcode: DistrictCode, tcode: TalukCode, gpcode: GpOrWard, vcode: VillageCode })
        .getRawMany();
    };

    async saveNewGpUser(data) {
        return userDataRepo.save(data);
    };
    async getMasterWithAssigned(data) {
        const { LoginType, Codes = [], DataType = "UnAssign" } = data;
        let query = `execute getMasterWithAssigned @0,@1,@2,@3,@4,@5,@6,@7,@8,@9,@10,@11`;
        let expandCodesParams = expandCodeParameters(LoginType, DataType, Codes);
        return await AppDataSource.query(query, expandCodesParams);
    }
    async getStagesWiseData(data) {
        const { DataType, DistrictName, TalukName, GpName, VillageName } = data;
        let query = `execute fetchMasterDataForReports @0,@1,@2,@3,@4`;
        return await AppDataSource.query(query, [DataType, DistrictName, TalukName, GpName, VillageName]);
    }
};