import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBallotList, getBallotData, getBallotListContent, getBallotListData } from "@/apis/ballots";
import { Ballot } from "@/apis/types";
import { useSearchParams } from "next/navigation";
import VoteItem from "./voteItem";


export default function AdminVoteItemList() {
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [ballots, setBallots] = useState<Ballot[]>([]);

    useEffect(() => {
        // '시작전'인 투표 목록
        // getBallotList('시작전', 'totalPages').then((pages) => {
        //     setTotalPages(pages);
        //     console.log(totalPages);
        // });
        // getBallotList('시작전', 'totalElements').then((elem) => {
        //     setTotalElements(elem);
        //     console.log(totalElements)
        // });
        // getBallotList('시작전', 'pageNumber').then((pageNum) => {
        //     setPageNumber(pageNum);
        //     console.log(pageNumber)
        // });

        /** '시작전'인 투표의 contents 배열 */
        const fetchBallotList = async () => {
            const contents = await getBallotListContent('시작전');
            setBallots(contents);
        };
        fetchBallotList();
    }, []);    

    return (
        <div className="flex flex-col mx-4">
            {ballots.length === 0 ? (
                <p className="text-center">시작전인 투표가 없습니다.</p>
            ) : (
                // contents 배열의 객체에서 ballotId 사용
                ballots.map((item: Ballot) => {
                    return (
                        <Link href={`/ballot/admin/${item.ballotId}`} key={item.ballotId}>
                            <VoteItem ballotID={item.ballotId} />
                        </Link>
                    )
                })
            )}
        </div>
    )
}
