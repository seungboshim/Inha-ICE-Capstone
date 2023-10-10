'use client';

import Header from "@/components/layout/header";
import OngoingTab from "../../../components/votelist/ongoingTab"
import VoteItemList from "../../../components/votelist/voteItemList"

export default function Ongoing() {
    return (
        <>
        <Header />
        <div className="mx-24">
            <OngoingTab />
            <VoteItemList />
        </div>
        </>
    )
}