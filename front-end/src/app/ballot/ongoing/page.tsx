'use client';

import Header from "@/components/layout/header";
import OngoingTab from "../../../components/votelist/ongoingTab"
import OngoingVoteItemList from "@/components/votelist/ongoingVoteItemList";

export default function Ongoing() {
    return (
        <>
        <Header />
        <div className="mx-24">
            <OngoingTab />
            <OngoingVoteItemList />
        </div>
        </>
    )
}