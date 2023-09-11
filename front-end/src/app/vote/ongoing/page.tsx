'use client';

import OngoingTab from "@/components/votelist/ongoingTab"
import VoteItemList from "@/components/votelist/voteItemList"

export default function Ongoing() {
    return (
        <div>
            <OngoingTab />
            <VoteItemList />
        </div>
    )
}