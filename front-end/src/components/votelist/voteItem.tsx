import React, { useState, useEffect } from "react"
import Image from "next/image"
import { getBallotData } from "@/apis/ballots"

interface VoteItemProps {
    ballotID: number;
}

export default function VoteItem( {ballotID}: VoteItemProps ) {
    const [ballotImage, setBallotImage] = useState('');
    const [ballotName, setBallotName] = useState('');
    const [ballotMinAge, SetBallotMinAge] = useState(0);
    const [ballotMaxAge, setBallotMaxAge] = useState(0);
    const [ballotSubjectGender, setBallotSubjectGender] = useState('');
    const [ballotSubjectRegion, setBallotSubjectRegion] = useState('');
    const [ballotBriefDescription, setBallotBriefDescription] = useState('');

    const [startYear, setStartYear] = useState<number>();
    const [startMonth, setStartMonth] = useState<number>();
    const [startDay, setStartDay] = useState<number>();

    const [endYear, setEndYear] = useState<number>();
    const [endMonth, setEndMonth] = useState<number>();
    const [endDay, setEndDay] = useState<number>();

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
    }, [ballotID])

    return (
        <div className="flex mx-2 border border-brightgrey shadow-lg rounded-lg">
            <div className="flex p-4 w-30 h-30 items-center">
                {ballotImage && (
                // "Image is missing required "src" property" 오류 회피
                    <>
                        <Image src={ballotImage} alt="투표 이미지" width={120} height={120} placeholder="blur" blurDataURL={ballotImage}/>
                    </>
                )}
            </div>
            <div className="flex flex-col px-4 py-4">
                <span className="text-lg font-bold">{ballotName}</span>
                <span>{`${startYear}년 ${startMonth}월 ${startDay}일~ ${endYear}년 ${endMonth}월 ${endDay}일`}</span>
                <span>{`${ballotMinAge}세 ~ ${ballotMaxAge}세`}</span>
                <span>{`${ballotSubjectRegion} 거주 ${ballotSubjectGender}`}</span>
                <span>{ballotBriefDescription}</span>
            </div>
        </div>
    )
}