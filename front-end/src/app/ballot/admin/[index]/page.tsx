'use client';

import Header from "@/components/layout/header";
import AdminVoteMain from "@/components/votepage/adminVoteMain";
import { usePathname } from "next/navigation";

export default function Vote() {
    const ballotIndexUrl = usePathname();
    // ballotID는 number type이기에 ballot_index를 parsing 처리
    const ballot_index = parseInt(ballotIndexUrl.replace('/ballot/admin/', ''));

    return (
        <div>
            <Header />
            <AdminVoteMain ballotID={ballot_index}/>
        </div>
    )
}