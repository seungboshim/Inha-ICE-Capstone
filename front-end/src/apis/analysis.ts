import { Server } from "./setting";

export const getGenderBasedAnalysis = async (ballotID: number) => {
    const result = await Server.get(`voting/analysis/gender-based/${ballotID}`);
    return result.data;
}

export const getRegionBasedAnalysis = async (ballotID: number) => {
    const result = await Server.get(`voting/analysis/region-based/${ballotID}`);
    return result.data;
}

export const getAgeBasedAnalysis = async (ballotID: number) => {
    const result = await Server.get(`voting/analysis/age-based/${ballotID}`);
    return result.data;
}