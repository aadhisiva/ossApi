import { Container } from 'typedi';
import express from "express";
import { UserServices } from '../apiServices/userServices';
import { mobileAppResponse } from '../utils/errorHandling';
import { getRoleAndUserId } from '../utils/resuableCode';
import { MOBILE_MESSAGES } from '../utils/constants';
import { authTokenAndVersion, authVersion } from '../utils/middlewares';


const userRouter = express.Router()

const userServices = Container.get(UserServices);

userRouter.post('/addUser', async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.addUser(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.ADDED));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/sendOtp', authVersion, async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.sendOtp(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.SEND_OTP));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/verifyOtp', authTokenAndVersion, async (req, res) => {
    try {
        let body = req.body;
        let result = await userServices.verifyOtp(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.VERIFY_OTP));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

/* ******************************* Sats apis*********************************** */

userRouter.post('/getChildDataWithSatsService', authTokenAndVersion, async (req, res) => {
    try {
        let body = { ...req.body, ...{ UserId: req?.headers?.userid } };
        let result = await userServices.getChildDataWithSatsId(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.GET_CHILD_DATA));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/checkSats', async (req, res) => {
    try {
        let body = { ...req.body, ...{ UserId: req?.headers?.userid } };
        let result = await userServices.checkSats(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.GET_CHILD_DATA));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

/* ********************************** Kutumba api **************************************** */

userRouter.post('/getKutumbaData', authTokenAndVersion, async (req, res) => {
    try {
        let body = { ...req.body, ...req.headers };
        let result = await userServices.getKutumbaData(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.GET_KUTUMBA_DATA));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});
userRouter.post('/checkKutumba', async (req, res) => {
    try {
        let body = { ...req.body, ...req.headers };
        let result = await userServices.checkKutumba(body);
        res.send(result);
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/getKutumbaData', authTokenAndVersion, async (req, res) => {
    try {
        let body = { ...req.body, ...req.headers };
        let result = await userServices.getKutumbaData(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.GET_KUTUMBA_DATA));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/getDataModesWise', authTokenAndVersion, async (req, res) => {
    try {
        let body = { ...req.body, ...{ UserId: req?.headers?.userid } };
        let result = await userServices.getDataModesWise(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.GET_KUTUMBA_DATA));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/getDbCounts', authTokenAndVersion, async (req, res) => {
    try {
        let body = { ...req.body, ...{ UserId: req?.headers?.userid } };
        let result = await userServices.getDbCounts(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.GET_KUTUMBA_DATA));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/getListWise', authTokenAndVersion, async (req, res) => {
    try {
        let body = { ...req.body, ...{ UserId: req?.headers?.userid } };
        let result = await userServices.getListWise(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.GET_KUTUMBA_DATA));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});
userRouter.post('/getEachList', authTokenAndVersion, async (req, res) => {
    try {
        let body = { ...req.body, ...{ UserId: req?.headers?.userid } };
        let result = await userServices.getEachList(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.GET_KUTUMBA_DATA));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/saveOssSurvey', authTokenAndVersion, async (req, res) => {
    try {
        let body = { ...req.body, ...{ UserId: req?.headers?.userid } };
        let result = await userServices.saveOssSurvey(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.GET_KUTUMBA_DATA));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/saveOssSurveyForHousehold', authTokenAndVersion, async (req, res) => {
    try {
        let body = { ...req.body, ...{ UserId: req?.headers?.userid } };
        let result = await userServices.saveOssSurveyForHousehold(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.GET_KUTUMBA_DATA));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/ekycService', async (req, res) => {
    try {
        let body = { ...req.body };
        let result = body;
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.GET_KUTUMBA_DATA));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});


// load test apis //

userRouter.post('/sendOtpLT', async (req, res) => {
    try {
        let body = { ...req.body };
        let result = await userServices.sendOtpLD(body);
        if (result['message']) {
            return  res.send({ code: result['code'], message: result['message'], data: {} });
        }
        res.send({ code: 200, message: "Otp Sent Successfully", data: result });
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/verifyOtpLT', async (req, res) => {
    try {
        let body = { ...req.body };
        let result = await userServices.verifyOtpLD(body);
        if (result?.message) {
            return  res.send({ code: result?.code, message: result?.message, data: {} });
        }
        res.send({ code: 200, message: "Verified Successfully", data: result });
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/getKutumbaLT', async (req, res) => {
    try {
        let body = { ...req.body };
        let result: any = await userServices.getKutumbadataLT(body);
        if (result?.message) {
            return res.send({ code: result['code'], message: result['message'], data: {} });
        }
        res.send({ code: 200, message: "Operation Successfully", data: result });
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/getChilddataLT', async (req, res) => {
    try {
        let body = { ...req.body };
        let result: any = await userServices.getChilddata(body);
        if (result?.message) {
           return res.send({ code: result['code'], message: result['message'], data: {} });
        }
        res.send({ code: 200, message: "Operation Successfully", data: result });
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/saveKutumbaLT', async (req, res) => {
    try {
        let body = { ...req.body };
        let result = await userServices.saveKutumba(body);
        if (result['message']) {
            return  res.send({ code: result['code'], message: result['message'], data: {} });
        }
        res.send({ code: 200, message: "Operation Successfully", data: result });
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/saveChildLT', async (req, res) => {
    try {
        let body = { ...req.body };
        let result = await userServices.saveChild(body);
        if (result['message']) {
            return  res.send({ code: result['code'], message: result['message'], data: {} });
        }
        res.send({ code: 200, message: "Operation Successfully", data: result });
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/saveSurveyLT', async (req, res) => {
    try {
        let body = { ...req.body };
        let result = await userServices.saveSurvey(body);
        if (result['message']) {
            return  res.send({ code: result['code'], message: result['message'], data: {} });
        }
        res.send({ code: 200, message: "Operation Successfully", data: result });
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});


export {
    userRouter
};