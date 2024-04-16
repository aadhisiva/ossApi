import { Service } from "typedi";
import { AppDataSource } from "../db/config";
import {
  Kutumba,
  OssSurveyData,
  StudentAndSchool,
  Version,
  UserData,
} from "../entities";
import { HouseHoldAndLibrary } from "../entities/housHoldAndLibaray";
import { Equal } from "typeorm";

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

  async checkHouseHoldExists(data) {
    const {RcNumber, MemberId} = data;
    return await houseHoldAndLibraryRepo.findOneBy({ RcNumber, MemberId });
  };
}
