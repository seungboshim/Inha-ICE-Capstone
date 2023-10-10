import { Server } from "./setting";

export interface BallotProps {
    ballotName: String,
    ballotBriefDescription: String,
    ballotDetailDescription: String,
    ballotStartDateTime: Date,
    ballotEndDateTime: Date,
    ballotImage: String,
    ballotMinAge: Number,
    ballotMaxAge: Number,
    ballotStatus: String, // boolean 으로 변경 염두
    ballotSubjectGender: String,
    ballotSubjectRegion: String,
}

export const getBallotListData = async (status: string, field: string) => {
    const result = await Server.get(`/voting/ballots?status=${status}`);
    return result.data.content.map((item: any) => item[field]);
}

export const getBallotList = async (status: string, field: string) => {
    const result = await Server.get(`/voting/ballots?status=${status}`);
    return result.data[field];
}

export const getBallotData = async (ballotID: number, field: string) => {
    const result = await Server.get(`/voting/ballots/${ballotID}`);
    return result.data[field];
};