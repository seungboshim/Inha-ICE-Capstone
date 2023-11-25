import { useState, useEffect } from "react"
import { Candidate } from "@/apis/types"
import { getAgeGenderBasedAnalysis, getRegionBasedAnalysis } from "@/apis/analysis"


export const CandidateInfo = ({ballotId}:any) => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [candidatesAgeGenderInfo, setCandidatesAgeGenderInfo] = useState<Candidate[]>([]);
    const [candidatesRegionInfo, setCandidatesRegionInfo] = useState<Candidate[]>([]);

    useEffect(() => {
        getAgeGenderBasedAnalysis(ballotId).then((candiInfo) => {
            setCandidatesAgeGenderInfo(candiInfo)
        });
        getRegionBasedAnalysis(ballotId).then((candiInfo) => {
            setCandidatesRegionInfo(candiInfo)
        });
    }, [ballotId])

    return { candidates, candidatesAgeGenderInfo, candidatesRegionInfo };
}