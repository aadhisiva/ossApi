import { Container } from 'typedi';
import express from "express";
import { webAppResponse } from '../utils/errorHandling';
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

// adminRouter.post("/assignMentProcess", async (req, res) => {
//     try {
//         let getBody = req.body;
//         let result = await adminServices.assignMentProcess(getBody);
//         return await webAppResponse(res, result, "", "assignMentProcess", WEBMESSAGES.UPDATE, "", "role");
//     } catch (error) {
//         return await webAppResponse(res, error);
//     }
// });

// adminRouter.post("/getAllWithCode", async (req, res) => {
//     try {
//         let getBody = req.body;
//         let result = await adminServices.getAllWithCode(getBody);
//         return await webAppResponse(res, result, "", "getAllWithCode", WEBMESSAGES.UPDATE, "", "role");
//     } catch (error) {
//         return await webAppResponse(res, error);
//     }
// });

adminRouter.post("/getAllWithCode", async (req, res) => {
    try {
        let getBody = req.body;
        let result = await adminServices.getAllWithCode(getBody);
        return await webAppResponse(res, result, "", "getAllWithCode", WEBMESSAGES.UPDATE, "", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post("/addToSurveyUser", async (req, res) => {
    try {
        let getBody = req.body;
        let result = await adminServices.assignToSurveyUser(getBody);
        return await webAppResponse(res, result, "", "assignMentProcess", WEBMESSAGES.UPDATE, "", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post("/getMasterWithAssigned", async (req, res) => {
    try {
        let getBody = req.body;
        let result = await adminServices.getMasterWithAssigned(getBody);
        return await webAppResponse(res, result, "", "assignMentProcess", WEBMESSAGES.GET_ALLDATA, "", "role");
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

/* new generic role based apis */

adminRouter.post("/checkRoleAndSendOtp", async (req, res) => {
    try {
        let getBody = req.body;
        let result = await adminServices.checkRoleAndSendOtp(getBody);
        return await webAppResponse(res, result, "", "checkRoleAndSendOtp", WEBMESSAGES.SEND_OTP, "", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post("/getRolesAndAccessData", async (req, res) => {
    try {
        let getBody = req.body;
        let result = await adminServices.getRolesAndAccessData(getBody);
        return await webAppResponse(res, result, "", "getRolesAndAccessData", WEBMESSAGES.GET_ALLDATA, "", "role");
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

adminRouter.post("/assignToMasterAndRoles", async (req, res) => {
    try {
        let getBody = req.body;
        let result = await adminServices.assignToMasterAndRoles(getBody);
        return await webAppResponse(res, result, "", "assignToMasterAndRoles", WEBMESSAGES.UPDATE, "", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post("/roleAssignment", async (req, res) => {
    try {
        let getBody = req.body;
        let result = await adminServices.roleAssignment(getBody);
        return await webAppResponse(res, result, "", "roleAssignment", WEBMESSAGES.UPDATE, "", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post("/AssignRoles", async (req, res) => {
    try {
        let getBody = req.body;
        let result = await adminServices.AssignRoles(getBody);
        return await webAppResponse(res, result, "", "AssignRoles", WEBMESSAGES.UPDATE, "", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

adminRouter.post("/deleteRoles", async (req, res) => {
    try {
        let getBody = req.body;
        let result = await adminServices.deleteRoles(getBody);
        return await webAppResponse(res, result, "", "deleteRoles", WEBMESSAGES.UPDATE, "", "role");
    } catch (error) {
        return await webAppResponse(res, error);
    }
});

export {
    adminRouter
};