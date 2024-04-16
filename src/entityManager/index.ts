import { Admin } from "typeorm";
import {
  AssignedData,
  HouseHoldAndLibrary,
  Kutumba,
  MasterData,
  MobileLogs,
  OssSurveyData,
  OtpLogs,
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
    MasterData
  ];
};
