import React, { useState, useEffect, useRef } from "react";
import { getBallotData } from "@/apis/ballots";
import { Candidate } from "@/apis/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getGenderBasedAnalysis, getRegionBasedAnalysis, getAgeBasedAnalysis } from "@/apis/analysis";
import GenderAnalysisModal from "./genderAnalysisModal";
import RegionAnalysisModal from "./regionAnalysisModal";
import AgeAnalysisModal from "./ageAnalysisModal";

export default function CompletedCandidatesModal({ ballotId }: any) {
    const router = useRouter();

    /** 후보자 정보 */
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    const [totalVotes, setTotalVotes] = useState(0);
    const [selectedCandidateId, setSelectedCandidateId] = useState(0);

    /** 후보자 정보 + 득표 정보 */
    const [candidatesInfo, setCandidatesInfo] = useState<Candidate[]>([]);
    const [candidatesRegionInfo, setCandidatesRegionInfo] = useState<Candidate[]>([]);
    const [candidatesAgeGroupInfo, setCandidatesAgeGroupInfo] = useState<Candidate[]>([]);
    /** 후보자 득표 정보 모달창 상태관리 */
    const [analysisModal, setAnalysisModal] = useState(false);

    /** 해당 투표 후보자 정보 */
    useEffect(() => {
        getBallotData(ballotId, 'candidates').then((candi) => {
            setCandidates(candi);

            //const total = candi.reduce((acc:any, current:any) => acc + current.candidateVoteCount, 0);
            //setTotalVotes(total);
            //console.log(totalVotes)
        });
    }, [])

    /** 선택한 후보자 정보 저장, 선택안된 경우 null */
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

    /** 해당 투표 후보자 정보 + 득표 정보 */
    useEffect(() => {
        getGenderBasedAnalysis(selectedCandidateId).then((candiInfo) => {
            setCandidatesInfo(candiInfo)
        });
        getRegionBasedAnalysis(selectedCandidateId).then((candiInfo) => {
            setCandidatesRegionInfo(candiInfo)
        });
        getAgeBasedAnalysis(selectedCandidateId).then((candiInfo) => {
            setCandidatesAgeGroupInfo(candiInfo)
        });
    }, [selectedCandidateId])

    /** 후보자 선택 */
    const handleSelect = (candidateId: number) => {
        console.log(candidateId)
        if (selectedCandidateId === candidateId) {
            //setAnalysisModal(!analysisModal); // 이미 선택한 후보자를 다시 누르면 모달창 닫기
            
        } else {
            // 선택한 후보자 Id 저장
            setSelectedCandidateId(candidateId);
            // 선택한 후보자의 객체를 candidate에 저장
            const candidate = candidates.find(c => c.candidateId === candidateId);
            //setSelectedCandidate(candidate || null);
            // if (!analysisModal) {
            //     setAnalysisModal(true); // 모달창 열기
            // } 
        }
    }

    /** 모달창 닫기 */
    // const handleCloseModal = () => {
    //     setAnalysisModal(false);
    //     setSelectedCandidate(null); // 선택된 후보자 상태 초기화
    // };

    /** overall 차트에 쓰일 데이터 */
    const barChartData = candidates.map((candidate) => ({
        name: candidate.candidateName,
        votes: candidate.candidateVoteCount,
    }));

    return (
        <div className="flex flex-col items-center mx-4 my-4">
            {candidates.length > 0 ? (
                <div className={`w-full md:w-1/2 md:justify-start`}> 
                    {/** overall 득표수의 막대 그래프 */}
                    <div className="flex justify-center">
                        <ResponsiveContainer width="100%" height={100}>
                            <BarChart data={barChartData}>
                                <XAxis dataKey="name"/>
                                <Tooltip />
                                <Bar dataKey="votes" fill="#0094FF" barSize={30}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    {candidates.map((candidate) => (
                        <>
                        <div 
                            key={candidate.candidateId} 
                            className={`flex items-center px-4 py-2 my-2 border ${candidate.candidateId === selectedCandidateId ? 'border-2 border-primary shadow-md' : 'border-lightgrey'} rounded-lg justify-between`}
                            onClick={() => handleSelect(candidate.candidateId)}
                        >
                            <Image src={candidate.candidateImage} alt={candidate.candidateName} width={80} height={80} className="mr-4"/>
                            <span>{candidate.candidateName}</span>
                            <span className="text-primary">
                                {`${candidate.candidateVoteCount} 표`}
                            </span>
                        </div>
                        </>
                    ))}
                    {
                        candidatesInfo.find(c => c.candidateId === selectedCandidateId) && (
                            <GenderAnalysisModal
                                candidate={candidatesInfo.find(c => c.candidateId === selectedCandidateId)!} // Non-null assertion operator 사용
                                //onClose={handleCloseModal}
                            />
                        )
                    }
                    {
                        candidatesRegionInfo.find(c => c.candidateId === selectedCandidateId) && (
                            <RegionAnalysisModal 
                                candidate={candidatesRegionInfo.find(c => c.candidateId === selectedCandidateId)!}
                            />
                        )
                    }
                    {
                        candidatesAgeGroupInfo.find(c => c.candidateId === selectedCandidateId) && (
                            <AgeAnalysisModal 
                                candidate={candidatesAgeGroupInfo.find(c => c.candidateId === selectedCandidateId)!}
                            />
                        )
                    }
                </div>
            ) : (
                <span>후보자를 불러오는 중입니다...</span>
            )}
        </div>
    )
}