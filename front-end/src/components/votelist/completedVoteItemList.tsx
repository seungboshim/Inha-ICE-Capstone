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

export default function CompletedVoteItemList() {
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const [ballots, setBallots] = useState<Ballot[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        /** '마감'인 투표의 contents 배열 */
        const fetchBallotList = async () => {
            const contents = await getBallotPageContent('마감', currentPage);
            setBallots(contents);
        };
        fetchBallotList();

        // '마감'인 투표 페이지 갯수
        getBallotList('마감', 'totalPages').then((pages) => {
            setTotalPages(pages);
            //console.log(totalPages);
        });
        // // '마감'인 투표 갯수
        // getBallotList('마감', 'totalElements').then((elem) => {
        //     setTotalElements(elem);
        //     console.log(totalElements)
        // });
        // '마감'인 투표의 현재 페이지
        getBallotList('마감', 'pageNumber').then((pageNum) => {
            setPageNumber(pageNum);
            console.log(pageNumber)
        });
        // // '마감'인 투표 한 페이지의 크기
        // getBallotList('마감', 'size').then((size) => {
        //     setPageSize(size);
        //     console.log(pageSize);
        // })
        console.log(`${currentPage}입니다`)
    }, [currentPage]);

    return (
        <div className="flex flex-col mx-4">
            {ballots.length === 0 ? (
                <p className="text-center">마감된 투표가 없습니다.</p>
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
