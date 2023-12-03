import React, { useState, useEffect } from "react"
import Image from "next/image"
import { getBallotData } from "@/apis/ballots"
import CandidatesModal from "../candidate/candidatesModal"
import CompletedCandidatesModal from "../candidate/completedCandidatesModal"
import { useRecoilState } from "recoil";
import { isAdminState } from "@/recoil/atoms/LoginAtom";
import TurnoutRegressionModal from "../candidate/regression/turnoutRegressionModal"

interface VoteMainProps {
    ballotID: number;
}

// dd
export default function VoteMain({ballotID} : VoteMainProps) {
    const [ballotImage, setBallotImage] = useState('');
    const [ballotName, setBallotName] = useState('');
    const [ballotMinAge, SetBallotMinAge] = useState(0);
    const [ballotMaxAge, setBallotMaxAge] = useState(0);
    const [ballotSubjectGender, setBallotSubjectGender] = useState('');
    const [ballotSubjectRegion, setBallotSubjectRegion] = useState('');
    const [ballotBriefDescription, setBallotBriefDescription] = useState('');
    const [BallotDetailDescription, setBallotDetailDescription] = useState('');
    const [startYear, setStartYear] = useState<number>();
    const [startMonth, setStartMonth] = useState<number>();
    const [startDay, setStartDay] = useState<number>();

    const [endYear, setEndYear] = useState<number>();
    const [endMonth, setEndMonth] = useState<number>();
    const [endDay, setEndDay] = useState<number>();

    const [isSubject, setIsSubject] = useState(false);
    const [notVoted, setNotVoted] = useState(false);

    const [ballotStatus, setBallotStatus] = useState('');

    const [isAdmin, setIsAdmin] = useRecoilState(isAdminState);


    useEffect(() => {
        getBallotData(ballotID, 'ballotName').then((name) => {
            setBallotName(name);
        });
        getBallotData(ballotID, 'ballotImage').then((image) => {
            setBallotImage(image);
        });
        getBallotData(ballotID, 'ballotStartDateTime').then((startDate) => {
            const parsedStartDate = new Date(startDate);

            const year = parsedStartDate.getFullYear();
            const month = parsedStartDate.getMonth() + 1;
            const day = parsedStartDate.getDate();
        
            setStartYear(year);
            setStartMonth(month);
            setStartDay(day);
        })
        getBallotData(ballotID, 'ballotEndDateTime').then((endDate) => {
            const parsedEndDate = new Date(endDate);

            const year = parsedEndDate.getFullYear();
            const month = parsedEndDate.getMonth() + 1;
            const day = parsedEndDate.getDate();
        
            setEndYear(year);
            setEndMonth(month);
            setEndDay(day);
        })
        getBallotData(ballotID, 'ballotMinAge').then((minAge) => {
            SetBallotMinAge(minAge);
        })
        getBallotData(ballotID, 'ballotMaxAge').then((maxAge) => {
            setBallotMaxAge(maxAge);
        })
        getBallotData(ballotID, 'ballotSubjectGender').then((gender) => {
            if (gender == null) {
                setBallotSubjectGender("전 성별");
            } else {
                setBallotSubjectGender(gender);
            }
        })
        getBallotData(ballotID, 'ballotSubjectRegion').then((region) => {
            if (region == null) {
                setBallotSubjectRegion("전국");
            } else {
                setBallotSubjectRegion(region);
            }
        })
        getBallotData(ballotID, 'ballotBriefDescription').then((brief) => {
            setBallotBriefDescription(brief);
        })
        getBallotData(ballotID, 'ballotDetailDescription').then((detail) => {
            setBallotDetailDescription(detail);
        })
        getBallotData(ballotID, 'isSubject').then((sub) => {
            setIsSubject(sub);
        })
        getBallotData(ballotID, 'notVoted').then((vote) => {
            setNotVoted(vote);
        })
        getBallotData(ballotID, 'ballotStatus').then((status) => {
            setBallotStatus(status);
        })
    }, [ballotID])

    const [modal, setModal] = useState(false);

    const handleModal = () => {
        setModal(true);
        console.log('open')
    }

    const handleModalClose = () => {
        setModal(false);
    }

    const VoteButton = () => {
        return (
            <div>
                {modal ? (
                    <button className="w-40 h-20 bg-primary rounded-lg" onClick={handleModalClose}>
                        <span className="text-xl font-bold text-white">창 닫기</span>
                    </button>                    
                ) : (
                    <button 
                        className={`w-40 h-20 ${(!isSubject || !notVoted) && ballotStatus === '진행중' ? 'bg-primary opacity-50' : 'bg-primary'} rounded-lg`} 
                        onClick={handleModal}
                        disabled={(!isSubject || !notVoted) && ballotStatus === '진행중'}
                    >
                        <span className="text-xl font-bold text-white">
                            {ballotStatus === '마감' ? '투표 마감' : (isSubject ? (notVoted ? '투표하기' : '투표 완료') : '대상이 아닙니다')}
                        </span>
                    </button>
                )}
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <div className="flex mx-4 mt-12 justify-between">
                <div className="flex w-1/4 items-center"> 
                {ballotImage && (
                    <>
                        <Image 
                        src={ballotImage} 
                        alt="투표이미지" 
                        width={200} 
                        height={200} 
                        className="w-full object-cover aspect-w-1 aspect-h-1 shadow-md rounded-lg" 
                        placeholder="blur"
                        blurDataURL={ballotImage}
                        />
                    </>
                )}
                </div>
                <div className="flex w-3/4 flex-col ml-4 justify-between">
                    <div className="flex flex-col">
                        <span className="font-bold text-2xl">{ballotName}</span>
                        <span className="py-4 border-b border-primary">{ballotBriefDescription}</span>
                        <div className="flex justify-end py-4 mb-8">
                            <div className="flex flex-col font-bold items-end">
                                <span>{`${startYear}년 ${startMonth}월 ${startDay}일~ ${endYear}년 ${endMonth}월 ${endDay}일`}</span>
                                <span>{`${ballotSubjectRegion} 거주 ${ballotMinAge}세 ~ ${ballotMaxAge}세 ${ballotSubjectGender}`}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-start">
                        <span className="mr-4">{BallotDetailDescription}</span>
                        <VoteButton />
                    </div>
                </div>
            </div>
            {
                modal && (ballotStatus === '진행중') && (
                    <div>
                        <CandidatesModal ballotId={ballotID}/>
                    </div>
                )
            }
            {
                modal && (ballotStatus === '마감') && (
                    <div>
                        <CompletedCandidatesModal ballotId={ballotID}/>
                    </div>
                )
            }
            {
                isAdmin && (ballotStatus === '진행중') && (
                    <div>
                        <TurnoutRegressionModal ballotId={ballotID}/>
                    </div>
                )
            }
        </div>
    )
}