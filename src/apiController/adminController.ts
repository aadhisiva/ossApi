import { Container } from 'typedi';
import express from "express";
import { webAppResponse, webAppResponseForLarge } from '../utils/errorHandling';
import { AdminServices } from '../apiServices/adminServ';
import { WEBMESSAGES } from '../utils/constants';

const adminRouter = express.Router()

const adminServices = Container.get(AdminServices);

adminRouter.post("/addSurveyRoles", async (req, res) => {
    try {
        let getBody = req.body;
        let result = await adminServices.addSurveyRoles(getBody);
        return await webAppResponse(res, result, "", "addSurveyRoles", WEBMESSAGES.SEND_OTP, "", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post("/sendOtpAndCheckRole", async (req, res) => {
    try {
        let getBody = req.body;
        let result = await adminServices.sendOtpAndCheckRole(getBody);
        return await webAppResponse(res, result, "", "sendOtpAndCheckRole", WEBMESSAGES.SEND_OTP, "", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post("/assignMentProcess", async (req, res) => {
    try {
        let getBody = req.body;
        let result = await adminServices.assignMentProcess(getBody);
        return await webAppResponse(res, result, "", "assignMentProcess", WEBMESSAGES.UPDATE, "", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post("/addToSurveyUser", async (req, res) => {
    try {
        let getBody = req.body;
        let result = await adminServices.assignToSurveyUser(getBody);
        return await webAppResponse(res, result, "", "assignToSurveyUser", WEBMESSAGES.UPDATE, "", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post("/getMasterWithAssigned", async (req, res) => {
    try {
        let getBody = req.body;
        let result = await adminServices.getMasterWithAssigned(getBody);
        return await webAppResponse(res, result, "", "getMasterWithAssigned", WEBMESSAGES.GET_ALLDATA, "", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post("/getStagesWiseData", async (req, res) => {
    try {
        let getBody = req.body;
        let result = await adminServices.getStagesWiseData(getBody);
        return await webAppResponse(res, result, "", "getStagesWiseData", WEBMESSAGES.GET_ALLDATA, "", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

export {
    adminRouter
};