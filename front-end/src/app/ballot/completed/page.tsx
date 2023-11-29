'use client';

import Header from "@/components/layout/header";
import CompletedTab from "../../../components/votelist/completedTab";
import CompletedVoteItemList from "@/components/votelist/completedVoteItemList";

export default function Completed() {
    return (
        <>
        <Header />
        <div className="mx-4 md:mx-24">
            <CompletedTab />
            <CompletedVoteItemList />
        </div>
        </>
    )
}