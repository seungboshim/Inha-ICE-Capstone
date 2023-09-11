import VoteItem from "./voteItem";
import Link from "next/link";

export default function VoteItemList() {
    return (
        <div className="flex mx-4 justify-between">
            <Link href={'/vote/dummy'}><VoteItem /></Link>
            <VoteItem />
            <VoteItem />
        </div>
    )
}