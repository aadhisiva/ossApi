import { Container } from 'typedi';
import express from "express";
import { UserServices } from '../apiServices/userServices';
import { mobileAppResponse } from '../utils/errorHandling';
import { getRoleAndUserId } from '../utils/resuableCode';
import { MOBILE_MESSAGES } from '../utils/constants';
import { authTokenAndVersion, authVersion } from '../utils/middlewares';
// import msgsData from "../../dummy.js";
// import { dummyData } from "../../sampleJson";


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
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.getChildDataWithSatsId(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.GET_CHILD_DATA));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

/* ********************************** Kutumba api **************************************** */

userRouter.post('/getKutumbaData', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...req.headers};
        let result = await userServices.getKutumbaData(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.GET_KUTUMBA_DATA));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/saveOssSurvey', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.saveOssSurvey(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.GET_KUTUMBA_DATA));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/saveOssSurveyForHousehold', authTokenAndVersion, async (req, res) => {
    try {
        let body = {...req.body, ...{UserId: req.headers.userid}};
        let result = await userServices.saveOssSurveyForHousehold(body);
        return mobileAppResponse(res, result, body, getRoleAndUserId(req, MOBILE_MESSAGES.GET_KUTUMBA_DATA));
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});

userRouter.post('/sendBulkMsgs', async (req, res) => {
    try {
        let newArray = [];
        for(let i = 0; i <= [].length; i++){
            let eachRow = [][i];
            let result = await userServices.sendBulkMsgs(eachRow);
            if(result.code != 200){
                newArray.push(eachRow);
            };
            console.log("sent", i)
        };
        res.send(newArray);
    } catch (error) {
        return mobileAppResponse(res, error);
    }
});


export {
    userRouter
};