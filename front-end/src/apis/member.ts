import { Server } from "./setting";

export interface MemberProps {
    memberEmail: String,
    memberName: String,
    memberNickName: String,
    memberPassword: String,
    memberBirthDate: Date,
    memberAge: number,
    memberGender: String,
    memberRegion: String,
    memberImage: String,
}

export const getMemberData = async (field: string) => {
    const result = await Server.get(`/members`);
    return result.data[field];
};