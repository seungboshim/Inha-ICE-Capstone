'use client';

import Header from "@/components/layout/header";
import Profile from "../../components/mypage/profile";
import UserVoteItemList from "@/components/votelist/userVoteItemList";

export default function MyPage() {
    return ( 
        <div>
            <Header />
            <Profile />
            <UserVoteItemList />
        </div>
    )
}