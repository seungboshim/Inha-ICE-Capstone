import { Server } from "./setting";

export const getBallotListContent = async (status: string) => {
    const result = await Server.get(`/voting/ballots?status=${status}`);
    return result.data.content;
}

export const getBallotPageContent = async (status: string, page: number) => {
    const result = await Server.get(`/voting/ballots?status=${status}&page=${page}`);
    return result.data.content;
}

export const getBallotList = async (status: string, field: string) => {
    const result = await Server.get(`/voting/ballots?status=${status}`);
    return result.data[field];
}

export const getBallotData = async (ballotID: number, field: string) => {
    const result = await Server.get(`/voting/ballots/${ballotID}`);
    return result.data[field];
};

export const getRecordsBallot = async () => {
    const result = await Server.get(`/members/vote-records`);
    return result.data;
}