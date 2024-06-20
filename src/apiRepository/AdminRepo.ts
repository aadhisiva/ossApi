import { Service } from 'typedi';
import { AppDataSource } from '../db/config';
import { Admin, Code, Equal } from 'typeorm';
import { AssigningMasters, DataAccess, RoleHierarchy, Roles, UserData } from '../entities';
import { expandCodeParameters } from '../utils/resuableCode';

const adminRepo = AppDataSource.getRepository(Admin);
const assigningMastersRepo = AppDataSource.getRepository(AssigningMasters);
const roleHierarchyRepo = AppDataSource.getRepository(RoleHierarchy);
const rolesRepo = AppDataSource.getRepository(Roles);
const dataAccessRepo = AppDataSource.getRepository(DataAccess);
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
        // let dbRes = await assignedDataRepo.find(
        //     {
        //         where: [{ Mobile: Equal(Mobile) }, { TalukOfficerMobile: Equal(Mobile) }, { GpOfficerMobile: Equal(Mobile) }],
        //         select: ['DistrictCode', 'TalukCode', 'GpOrWard', 'AssigningType']
        //     });
            // const fetchData = await assignedDataRepo.createQueryBuilder('ad')
            // .leftJoinAndSelect(RoleHierarchy, 'rf', 'rf.id=ad.RoleId')
            // .select(["ad.DistrictCode", "ad.TalukCode", "ad.GpOrWard", "rf.Role as AssigningType"])
            // .where("ad.Mobile = :Mobile", {Mobile: Equal(Mobile)})
            // .getRawMany();
        return [];
    }
    async updateLoginOtp(Mobile, Otp) {
        // let dbRes = await assignedDataRepo.findOneBy({ Mobile: Equal(Mobile) });
        // let newData = { ...dbRes, ...{ Otp } };
        return [];
    }
    // async assignToDistrict(data) {
    //     const { id } = data;
    //     let findData = await assignedDataRepo.findOneBy({ id: Equal(id) });
    //     let newData = { ...findData, ...data };
    //     return assignedDataRepo.save(newData);
    // }
    // async assignToTaluk(data) {
    //     const { id } = data;
    //     let findData = await assignedDataRepo.findOneBy({ id: Equal(id) });
    //     let newData = { ...findData, ...data };
    //     return assignedDataRepo.save(newData);
    // };

    // async assignToGp(data) {
    //     const { id } = data;
    //     let findData = await assignedDataRepo.findOneBy({ id: Equal(id) });
    //     let newData = { ...findData, ...data };
    //     return assignedDataRepo.save(newData);
    // };

    // async assignToVillages(data) {
    //     const { id } = data;
    //     let findData = await userDataRepo.findOneBy({ id: Equal(id) });
    //     let newData = { ...findData, ...data };
    //     return userDataRepo.save(newData);
    // };

    // async fetchDistrictAssigned(data) {
    //     const { DistrictCode, ListType } = data;
    //     return await assignedDataRepo.find({ where: { DistrictCode: Equal(DistrictCode), ListType: Equal(ListType) } });
    // }
    // async fetchTalukAssigned(data) {
    //     const { DistrictCode, TalukCode, ListType } = data;
    //     return await assignedDataRepo.createQueryBuilder('s')
    //     .select(["s.TalukOfficerName as Name", "s.TalukOfficerMobile as Mobile", "s.id as id", "s.AssigningType as AssigningType"])
    //     .where("s.DistrictCode= :dcode and s.TalukCode= :tcode and s.ListType= :list", { dcode: DistrictCode, tcode: TalukCode, list: ListType })
    //     .getRawMany();
    // }
    // async fetchGpAssigned(data) {
    //     const { TalukCode, GpOrWard, DistrictCode, ListType } = data;
    //     return await assignedDataRepo.createQueryBuilder('s')
    //     .select(["s.GpOfficerName as Name", "s.GpOfficerMobile as Mobile", "s.id as id", "s.AssigningType as AssigningType"])
    //     .where("s.DistrictCode= :dcode and s.TalukCode= :tcode and s.GpOrWard= :gpcode and s.ListType= :list", { dcode: DistrictCode, tcode: TalukCode, gpcode: GpOrWard, list: ListType })
    //     .getRawMany();
    // };
    // async fetchSurveyorData(data) {
    //     const { TalukCode, GpOrWard, DistrictCode, VillageCode } = data;
    //     return await userDataRepo.createQueryBuilder('s')
    //     .select(["s.Name as Name", "s.Mobile as Mobile", "s.id as id", "s.Role as Role"])
    //     .where("s.DistrictCode= :dcode and s.TalukCode= :tcode and s.GpOrWard= :gpcode and s.VillageCode= :vcode", 
    //     { dcode: DistrictCode, tcode: TalukCode, gpcode: GpOrWard, vcode: VillageCode })
    //     .getRawMany();
    // };

    async fetchDistrictAssigned(data) {
        const { DistrictCode, ListType } = data;
        return await assigningMastersRepo.find({ where: { DistrictCode: Equal(DistrictCode), ListType: Equal(ListType) } });
    }
    async fetchTalukAssigned(data) {
        const { DistrictCode, TalukCode, ListType } = data;
        return await assigningMastersRepo.createQueryBuilder('s')
            .select(["s.Name as Name", "s.Mobile as Mobile", "s.id as id", "s.ListType as ListType"])
            .where("s.DistrictCode= :dcode and s.TalukCode= :tcode and s.ListType= :list", { dcode: DistrictCode, tcode: TalukCode, list: ListType })
            .getRawMany();
    }
    async fetchGpAssigned(data) {
        const { TalukCode, GpOrWard, DistrictCode, ListType } = data;
        return await assigningMastersRepo.createQueryBuilder('s')
            .select(["s.Name as Name", "s.Mobile as Mobile", "s.id as id", "s.ListType as ListType"])
            .where("s.DistrictCode= :dcode and s.TalukCode= :tcode and s.GpCode= :gpcode and s.ListType= :list", { dcode: DistrictCode, tcode: TalukCode, gpcode: GpOrWard, list: ListType })
            .getRawMany();
    };
    async fetchApporvalData(data) {
        const { TalukCode, DistrictCode, VillageCode } = data;
        return await assigningMastersRepo.createQueryBuilder('s')
            .select(["s.Name as Name", "s.Mobile as Mobile", "s.id as id", "s.ListType as ListType"])
            .where("s.DistrictCode= :dcode and s.TalukCode= :tcode and s.VillageCode= :vcode and s.ListType= :list", { dcode: DistrictCode, tcode: TalukCode, vcode: VillageCode, list: 'Gp' })
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
        const { LoginType, Codes = [], DataType = "UnAssign", TypeOfData } = data;
        let query = `execute getMasterWithAssigned @0,@1,@2,@3,@4,@5,@6,@7,@8,@9,@10,@11,@12`;
        let expandCodesParams = expandCodeParameters(LoginType, DataType, Codes, TypeOfData);
        return await AppDataSource.query(query, expandCodesParams);
    }
    async getStagesWiseData(data) {
        const { DataType, DistrictName, TalukName, GpName, VillageName } = data;
        let query = `execute fetchMasterDataForReports @0,@1,@2,@3,@4`;
        return await AppDataSource.query(query, [DataType, DistrictName, TalukName, GpName, VillageName]);
    }

    /* new repos */

    async checkRolesWithMobile(data) {
        const { Mobile } = data;
        let dbRes = await assigningMastersRepo.createQueryBuilder('ad')
            .leftJoinAndSelect(RoleHierarchy, 'rf', 'rf.id=ad.RoleId')
            .select(['ad.DistrictCode as DistrictCode', 'ad.TalukCode as TalukCode', 'ad.GpCode as GpCode',
                'rf.Role as AssigningType', "rf.id as RoleId"])
            .where("ad.Mobile = :Mobile", { Mobile })
            .getRawMany();
        return dbRes;
    };

    async updateAssignedMasters(Mobile, Otp) {
        let dbRes = await assigningMastersRepo.findOneBy({ Mobile: Equal(Mobile) });
        let newData = { ...dbRes, ...{ Otp } };
        return assigningMastersRepo.save(newData);
    };

    async fetchRolesAndAccess(data) {
        const { RoleId } = data;
        let roles = await rolesRepo.createQueryBuilder('role')
            .leftJoinAndSelect(RoleHierarchy, 'rh', "rh.id = role.Child")
            .select(["role.RoleId as RoleId", "role.Child as Child", "role.IsLastStage as IsLastStage", "rh.Role as ChildRole"])
            .where("role.RoleId = :RoleId", { RoleId })
            .getRawMany();
        let roleAccess = await dataAccessRepo.find(
            {
                where: [{ RoleId: Equal(RoleId) }],
                select: ['RoleId', 'District', 'GpOrPhc', 'TalukorZone', 'VllageOrWard', 'TypeOfData']
            });
        return { roles: roles, access: roleAccess };
    };

    async assigningToEachMaster(data) {
        const { id } = data;
        let findData = await assigningMastersRepo.findOneBy({ id: Equal(id) });
        let newData = { ...findData, ...data };
        return assigningMastersRepo.save(newData);
    }

    async assignToSurveyor(data) {
        const { id } = data;
        let findData = await userDataRepo.findOneBy({ id: Equal(id) });
        let newData = { ...findData, ...data };
        return userDataRepo.save(newData);
    };

    async updateGpInMaster(data) {
        const { DistrictCode, TalukCode, GpCode, VillageCode } = data;
       let query = 'update MasterData set GramPanchayatCode=@0, GramPanchayatLGDCode=@1, GramPanchayatName=@2 where DistrictCode=@3 and TalukCode=@4 and VillageCode=@5';
       return await AppDataSource.query(query, [GpCode, GpCode, GpCode, DistrictCode, TalukCode, VillageCode]);
    };

    async addUserInMaster(data) {
        const { id } = data;
        let findData = await userDataRepo.findOneBy({ id: Equal(id) });
        let newData = { ...findData, ...data };
        return userDataRepo.save(newData);
    };

    // async findRoleHierarchy(data) {
    //     const { id } = data;
    //     let findData = await roleHierarchyRepo.findOneBy({ id: Equal(id) });
    //     let newData = { ...findData, ...data };
    //     return roleHierarchyRepo.save(newData);
    // };

    // async findRoles(data) {
    //     const { id } = data;
    //     let findData = await rolesRepo.findOneBy({ id: Equal(id) });
    //     let newData = { ...findData, ...data };
    //     return rolesRepo.save(newData);
    // };

    // async findAccess(data) {
    //     const { id } = data;
    //     let findData = await dataAccessRepo.findOneBy({ id: Equal(id) });
    //     let newData = { ...findData, ...data };
    //     return dataAccessRepo.save(newData);
    // };
    async findRoleHierarchy(data) {
        return await roleHierarchyRepo.find();
    };

    async findRoles(data) {
        return await rolesRepo.createQueryBuilder('role')
            .leftJoinAndSelect(RoleHierarchy, 'rh', "rh.id = role.Child")
            .select(["role.RoleId as RoleId","role.id as id",  "role.Child as Child", "role.IsLastStage as IsLastStage", "rh.Role as ChildRole"])
            .getRawMany();
    };

    async findAccess(data) {
        return await dataAccessRepo.createQueryBuilder('role')
            .leftJoinAndSelect(RoleHierarchy, 'rh', "rh.id = role.RoleId")
            .select(["role.RoleId as RoleId","role.id as id",  "role.District as District", 
            "role.TalukorZone as TalukorZone","role.GpOrPhc as GpOrPhc", "rh.Role as Role","role.VllageOrWard as VllageOrWard",
            "role.TypeOfData as TypeOfData"])
            .getRawMany();
    };

    async saveRoleHierarchy(data) {
        const { id } = data;
        const findData = await roleHierarchyRepo.findOneBy({ id: Equal(id) });
        let newData = { ...findData, ...data };
        return await roleHierarchyRepo.save(newData);
    };

    async saveRoles(data) {
        const { id } = data;
        const findData = await rolesRepo.findOneBy({ id: Equal(id) });
        let newData = { ...findData, ...data };
        return await rolesRepo.save(newData);
    };

    async saveAccess(data) {
        const { id } = data;
        const findData = await dataAccessRepo.findOneBy({ id: Equal(id) });
        let newData = { ...findData, ...data };
        return await dataAccessRepo.save(newData);
    };

    async deleteRoleHierarchy(id) {
        return await roleHierarchyRepo
            .createQueryBuilder()
            .delete()
            .where("id= :id", { id: id })
            .execute()
    };

    async deleteRoles(id) {
        console.log("if", id)
        return await rolesRepo
            .createQueryBuilder()
            .delete()
            .where("id= :id", { id: id })
            .execute()
    };

    async deleteAccess(id) {
        return await dataAccessRepo
            .createQueryBuilder()
            .delete()
            .where("id= :id", { id: id })
            .execute()
    };
};