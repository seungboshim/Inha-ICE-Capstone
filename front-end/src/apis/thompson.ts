import { FlaskServer } from "./setting";

export const getOrderedList = async (type: string, id: number) => {
    const result = await FlaskServer.get(`/bandit?type=${type}&id=${id}`);
    return result.data.orderdList;
};

export const sendBannerStatus = async (type: string, id: number, successList: number[], failureList: number[]) => {
    console.log(
        {
            type,
            id,
            successList,
            failureList
        }
    )
    const result = await FlaskServer.patch(`/bandit`, {
        type,
        id,
        successList,
        failureList
    });
    return result.data;
}

export const createBandits = async (type: string, id: number, bannerList: number[]) => {
    console.log({
        type, id, bannerList
    })
    const result = await FlaskServer.post(`/bandit`, {
        type,
        id,
        bannerList
    });
    return result.data;
}