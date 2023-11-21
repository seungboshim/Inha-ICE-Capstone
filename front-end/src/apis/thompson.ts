import { FlaskServer } from "./setting";

export const getOrderdList = async (ballotId: number) => {
    const result = await FlaskServer.get(`/${ballotId}`);
    return result.data.orderdList;
};

export const sendBannerStatus = async (ballotId: number, successList: number[], failureList: number[]) => {
    console.log(
        {
            ballotId,
            successList,
            failureList
        }
    )
    const result = await FlaskServer.patch(`/`, {
        ballotId,
        successList,
        failureList
    });
    return result.data;
}