import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBallotList, getBallotData, getBallotListContent, getBallotListData } from "@/apis/ballots";
import { useSearchParams } from "next/navigation";
import VoteItem from "./voteItem";

type Ballot = {
    ballotId: number,
    ballotName: string,
    ballotStartDateTime: string,
    ballotEndDateTime: string,
    ballotMinAge: number,
    ballotMaxAge: number,
    ballotSubjectRegion: string,
    ballotSubjectGender: string,
    ballotBriefDescription: string,
    ballotImage: string,
    ballotStatus: string,
}

export default function OngoingVoteItemList() {
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [ballots, setBallots] = useState<Ballot[]>([]);

    useEffect(() => {
        // '진행중'인 투표 목록
        // getBallotList('진행중', 'totalPages').then((pages) => {
        //     setTotalPages(pages);
        //     console.log(totalPages);
        // });
        // getBallotList('진행중', 'totalElements').then((elem) => {
        //     setTotalElements(elem);
        //     console.log(totalElements)
        // });
        // getBallotList('진행중', 'pageNumber').then((pageNum) => {
        //     setPageNumber(pageNum);
        //     console.log(pageNumber)
        // });

        /** '진행중'인 투표의 contents 배열 */
        const fetchBallotList = async () => {
            const contents = await getBallotListContent('진행중');
            setBallots(contents);
        };
        fetchBallotList();
    }, []);    

    return (
        <div className="flex flex-col mx-4">
            {ballots.length === 0 ? (
                <p className="text-center">진행중인 투표가 없습니다.</p>
            ) : (
                // contents 배열의 객체에서 ballotId 사용
                ballots.map((item: Ballot) => {
                    return (
                        <Link href={`/ballot/${item.ballotId}`} key={item.ballotId}>
                            <VoteItem ballotID={item.ballotId} />
                        </Link>
                    )
                })
            )}
        </div>
    )
}
