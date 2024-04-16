import axios from "axios";

const axiosGetChild = async (body) => {
    return await axios.post(process.env.SATS_API, body);
};

export const getStudentDetailsWithTypeWise = async (data) => {
    try {
        const { type, rollNo } = data;
        let childBody = {
            SEARCH_TYPE: type == "S" ? "S" : "A",
            CHILD_ENROLL_NO: rollNo
        };
        let getChild = await axiosGetChild(childBody);
        let checkRes = getChild?.data?.StudentRecord;
        if(checkRes?.status == false || checkRes?.statusCode !== 200) return {code: 422, message: checkRes?.statusMsg}
        return getChild?.data;
    } catch (e) {
        return e;
    }
};