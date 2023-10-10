import React, { useState, useEffect } from "react";
import VoteItem from "./voteItem";
import Link from "next/link";
import { getBallotList, getBallotListData } from "@/apis/ballots";
import { useSearchParams } from "next/navigation";

export default function VoteItemList() {
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [ballots, setBallots] = useState('');
    const params = useSearchParams();
    const status = params.get('status')

    useEffect(() => {
        // '마감'인 투표 목록
        getBallotList('마감', 'totalPages').then((pages) => {
            setTotalPages(pages);
            console.log(totalPages);
        });
        getBallotList('마감', 'totalElements').then((elem) => {
            setTotalElements(elem);
            console.log(totalElements)
        });
        getBallotList('마감', 'pageNumber').then((pageNum) => {
            setPageNumber(pageNum);
            console.log(pageNumber)
        });
        getBallotListData('마감', 'ballotName').then((ballotsNames) => {
            setBallots(ballotsNames);
            console.log(ballots)
        })
    }, []);

    return (
        <div className="flex flex-col mx-4">
            {/* {ballots.map(ballot => (
                <Link href={`/vote/${ballot.ballotID}`} key={ballot.ballotID}>
                    <VoteItem ballotID={ballot.ballotID} />
                </Link>
            ))} */}
            <Link href={`/ballot/1`}>
                <VoteItem ballotID={1} />
            </Link>
        </div>
    )
}
