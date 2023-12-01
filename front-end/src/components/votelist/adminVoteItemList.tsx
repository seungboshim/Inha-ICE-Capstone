import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBallotList, getBallotData, getBallotListContent, getBallotPageContent } from "@/apis/ballots";
import { Ballot } from "@/apis/types";
import { useSearchParams } from "next/navigation";
import VoteItem from "./voteItem";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl"


export default function AdminVoteItemList() {
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [ballots, setBallots] = useState<Ballot[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        /** '시작전'인 투표의 contents 배열 */
        const fetchBallotList = async () => {
            const contents = await getBallotPageContent('시작전', currentPage);
            setBallots(contents);
        };
        fetchBallotList();

        // '시작전'인 투표 목록
        getBallotList('시작전', 'totalPages').then((pages) => {
            setTotalPages(pages);
            //console.log(totalPages);
        });
        // getBallotList('시작전', 'totalElements').then((elem) => {
        //     setTotalElements(elem);
        //     console.log(totalElements)
        // });
        getBallotList('시작전', 'pageNumber').then((pageNum) => {
            setPageNumber(pageNum);
            console.log(pageNumber)
        });
    }, [currentPage, pageNumber]);    

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
            <div className={`flex justify-between my-8 ${totalPages === 0 ? 'hidden' : totalPages < 2 ? 'text-grey' : 'text-black'}`}>
                <button 
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} 
                    disabled={currentPage === 1}
                >
                    <SlArrowLeft size={24} />
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button 
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                >
                    <SlArrowRight size={24} />
                </button>
            </div>
        </div>
    )
}
