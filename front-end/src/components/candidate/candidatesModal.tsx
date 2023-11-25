import React, { useState, useEffect, useRef } from "react";
import { getBallotData } from "@/apis/ballots";
import { Candidate } from "@/apis/types";
import { Server } from "@/apis/setting";
import Image from "next/image";
import { RiFileAddFill } from "react-icons/ri";
import { AiFillPlusCircle } from "react-icons/ai"
import { useRouter } from "next/navigation";

export default function CandidatesModal({ ballotId }: any) {
    const router = useRouter();

    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [selectedCandidateId, setSelectedCandidateId] = useState(0);

    useEffect(() => {
        getBallotData(ballotId, 'candidates').then((candi) => {
            setCandidates(candi);
        });
    }, [])

    const handleSelect = (candidateId: number) => {
        setSelectedCandidateId(candidateId);
        console.log(`${candidateId} 선택`)

        setFormData({
            ...formData,
            candidateId: candidateId,
        });
    }

    const [formData, setFormData] = useState({
        ballotId: ballotId,
        candidateId: selectedCandidateId,
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        alert("투표가 완료되었습니다. 반영까지 약 15초가 소요됩니다.")
        router.push(`/ballot/${ballotId}/banner`);

        if (selectedCandidateId) {
            try {
                const response = await Server.post('/voting', formData);
                console.log(response.data);  // 응답 데이터 확인
    
                // TODO : 투표하고 로딩화면으로 라우팅
            } catch (error: any) {
                console.error(error);
                alert(error.response.data.message);
            }
        }
    }

    return (
        <div className="flex flex-col items-center mx-4 my-4">
            {candidates.length > 0 ? (
                <div className={`w-full md:w-1/3 md:justify-start`}> 
                    {candidates.map((candidate) => (
                        <div 
                            key={candidate.candidateId} 
                            className={`flex items-center px-4 py-2 my-2 cursor-pointer border ${
                                selectedCandidateId === candidate.candidateId ? 'border-2 border-primary shadow-md' : 'border-grey'
                            } rounded-lg`}
                            onClick={() => handleSelect(candidate.candidateId)}
                        >
                            <Image src={candidate.candidateImage} alt={candidate.candidateName} width={80} height={80} className="mr-4"/>
                            <span>{candidate.candidateName}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <span>후보자를 불러오는 중입니다...</span>
            )}
            <button className="m-4 p-4 rounded-lg text-white bg-primary" onClick={handleSubmit}>
                투표하기
            </button>
        </div>
    )
}