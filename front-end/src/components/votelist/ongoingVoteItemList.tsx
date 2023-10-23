import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBallotList, getBallotPageContent, getBallotData, getBallotListContent } from "@/apis/ballots";
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

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        /** '진행중'인 투표의 contents 배열 */
        const fetchBallotList = async () => {
            const contents = await getBallotPageContent('진행중', currentPage);
            setBallots(contents);
        };
        fetchBallotList();

        // '진행중'인 투표 목록
        getBallotList('진행중', 'totalPages').then((pages) => {
            setTotalPages(pages);
            //console.log(totalPages);
        });
        // getBallotList('진행중', 'totalElements').then((elem) => {
        //     setTotalElements(elem);
        //     console.log(totalElements)
        // });
        getBallotList('진행중', 'pageNumber').then((pageNum) => {
            setPageNumber(pageNum);
            console.log(pageNumber)
        });

    }, [currentPage]);    

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
            <div className="flex justify-between mt-4">
                <button 
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} 
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    )
}
