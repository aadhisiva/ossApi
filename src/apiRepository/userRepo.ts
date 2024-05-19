import { Service } from "typedi";
import { AppDataSource } from "../db/config";
import {
  Kutumba,
  OssSurveyData,
  StudentAndSchool,
  Version,
  UserData,
  MasterData,
} from "../entities";
import { HouseHoldAndLibrary } from "../entities/housHoldAndLibaray";
import { Brackets, Equal } from "typeorm";

const userDataRepo = AppDataSource.getRepository(UserData);
const versionDataRepo = AppDataSource.getRepository(Version);
const ossDataRepo = AppDataSource.getRepository(OssSurveyData);
const houseHoldAndLibraryRepo = AppDataSource.getRepository(HouseHoldAndLibrary);
const studentAndSchoolRepo = AppDataSource.getRepository(StudentAndSchool);
const kutumbaRepo = AppDataSource.getRepository(Kutumba);

@Service()
export class UserRepo {

  async getUserData(Mobile) {
    return await userDataRepo.findOneBy({ Mobile });
  };

  async getUserDataById(UserId) {
    return await userDataRepo.findOneBy({ UserId });
  }

  async getVersionOfApp() {
    let data = await versionDataRepo.find();
    if (data?.length == 0) return { code: 404 };
    return data;
  }

  async checkUserExits(Mobile, UserId) {
    return await userDataRepo.findOneBy({ UserId, Mobile });
  }

  async sendOtp(data) {
    const { Mobile } = data;
    let findOneBy = await userDataRepo.findOneBy({ Mobile });
    if (!findOneBy) return { code: 404, message: "UserData Not Found." };
    let newData = { ...findOneBy, ...data };
    return await userDataRepo.save(newData);
  }

  async getUsersList(data) {
    const { Mobile } = data;
    return await userDataRepo.find({
        where: {Mobile: Mobile},
        select: ["UserId", "GpOrWard", "Name", "Type"],
    });
  }

  async addUser(data) {
    return await userDataRepo.save(data);
  };

  async saveDataInStudentAndSchoolAsSats(data) {
    let findData = await studentAndSchoolRepo.findOneBy({StudentId: data?.StudentId});
    let newData = {...findData, ...data};
    return await studentAndSchoolRepo.save(newData);
  }

  async saveKutumbaData(data) {
    const { RC_NUMBER, MEMBER_ID } = data;
    let findData = await kutumbaRepo.findOneBy({ MEMBER_ID, RC_NUMBER });
    let newData = { ...findData, ...data };
    return await kutumbaRepo.save(newData);
  };

  async getKutumbaData(rc) {
    let findData = await kutumbaRepo.find({ where : {RC_NUMBER: Equal(rc) }});
    return findData;
  };

  async getPendingCounts(data) {
    let findData = await ossDataRepo.count({ where : {UserId: Equal(data?.UserId), Status: "Pending"}});
    return findData;
  };

  async checkRcDeatils(rc) {
    let fetchKutumba = await kutumbaRepo.find({where:{RC_NUMBER: rc}});
    let fetchOss = await ossDataRepo.find({ where : {RCNumber: rc}});
    return {fetchKutumba, fetchOss};
  };

  async checkAadharSurveyData(aadhar) {
    let fetchOssData = await ossDataRepo.findOneBy({ParentAadhar: aadhar});
    return fetchOssData;
  };

  async getListWise(data) {
    const { UserId, Status, PageNo=1, PageSize=10, searchTerm } = data;
    let totalData =await ossDataRepo.createQueryBuilder('s')
    .innerJoin(UserData, 'ud', 's.UserId = ud.UserId')
    // .innerJoin(MasterData, 'md', 'ud.TalukCode = md.TalukCode')x`x`
    .select(['s.StudentName as StudentName', 's.Status as Status', 's.SurveyMode as SurveyMode','s.RCNumber as RCNumber',
        's.StudentId as StudentId', 's.StudentAadharHash as StudentAadharHash', 's.StudentGender as StudentGender'
      , 's.ParentName as ParentName', 's.StudentNotGoing as StudentNotGoing', 's.ParentMobile as ParentMobile', 's.id as id'])
    .where("s.UserId = :id and s.Status = :status", { id: UserId, status: Status })
    .andWhere(new Brackets(qb => {
      qb.where("other.StudentName like :term", { term: `%${searchTerm}%` })
      .orWhere("other.StudentId like :term", { term: `%${searchTerm}%` })
      .orWhere("other.StudentAadharHash like :term", { term: `%${searchTerm}%` })
      .orWhere("other.RCNumber like :term", { term: `%${searchTerm}%` })
      .orWhere("other.SurveyMode like :term", { term: `%${searchTerm}%` })
    }))
    .orderBy('s.CreatedDate', "DESC")
    .skip(+((PageNo - 1) * PageSize))
    .take(+PageSize)
    .getRawMany();
    return {
      totalCount: totalData.length,
      PageNo,
      PageSize,
      totalData: totalData
    }
  };

  async getCompletedCounts(data) {
    let findData = await ossDataRepo.count({ where : {UserId: Equal(data?.UserId), Status: "Completed"}});
    return findData;
  };

  async getEachList(data) {
    const { id } = data;
    let findData = await ossDataRepo.findOneBy({id});
    return findData;
  };

  async saveOssData(data) {
    let oldData = await ossDataRepo.findOneBy({ StudentId: data?.StudentId });
    let newData = { ...oldData, ...data };
    return await ossDataRepo.save(newData);
  };

  async saveSurveyData(data) {
    return await ossDataRepo.save(data);
  };

  async saveSurveyHouseHoldData(data) {
    return await houseHoldAndLibraryRepo.save(data);
  };

  async checkStudentExists(id) {
    return await ossDataRepo.findOneBy({ StudentId: id });
  };

  async fecthMobileBasedData(no) {
    return await ossDataRepo.find({ where:{ ParentMobile: no }});
  };

  async checkMemberId(memnerId, rc) {
    return await ossDataRepo.findOneBy({ StudentMemberId: memnerId, RCNumber: rc });
  };

  async checkRcInHouseHold(data) {
    const {RcNumber, MemberId} = data;
    return await houseHoldAndLibraryRepo.findOneBy({ RcNumber, MemberId });
  };

  async checkAadharInHouseHold(no) {
    return await houseHoldAndLibraryRepo.findOneBy({ ParentAadhar: no });
  };

  async checkMobileInHouseHold(no) {
    return await houseHoldAndLibraryRepo.findOneBy({ ParentMobile: no });
  };

  async checkSatsInHouseHold(no) {
    return await houseHoldAndLibraryRepo.findOneBy({ StudentId: no });
  };
}
