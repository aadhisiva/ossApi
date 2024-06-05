import { Admin } from "typeorm";
import {
  AssignedData,
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
    Admin,
    AssignedData,
    HouseHoldAndLibrary,
    MasterData,
    Roles,
    RoleHierarchy,
    DataAccess,
    AssigningMasters

  ];
};
