import { Admin } from "typeorm";
import {
  AdminData,
  AssigningMasters,
  DataAccess,
  HouseHoldAndLibrary,
  Kutumba,
  MasterData,
  MobileLogs,
  OssSurveyData,
  OtpLogs,
  RoleHierarchy,
  Roles,
  StudentAndSchool,
  UserData,
  Version,
  webLogs,
} from "../entities";

export const entities = () => {
  return [
    MobileLogs,
    OtpLogs,
    UserData,
    webLogs,
    Version,
    StudentAndSchool,
    Kutumba,
    OssSurveyData,
    AdminData,
    HouseHoldAndLibrary,
    MasterData,
    Roles,
    RoleHierarchy,
    DataAccess,
    AssigningMasters

  ];
};
