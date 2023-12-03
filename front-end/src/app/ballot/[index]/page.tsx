'use client';

import Header from "@/components/layout/header";
import VoteMain from "../../../components/votepage/voteMain";
import { usePathname } from "next/navigation";

export default function Vote() {
    const ballotIndexUrl = usePathname();
    // ballotID는 number type이기에 ballot_index를 parsing 처리
    const ballot_index = parseInt(ballotIndexUrl.replace('/ballot/', ''));

    return (
        <div>
            <Header />
            <VoteMain ballotID={ballot_index}/>
        </div>
    )
}