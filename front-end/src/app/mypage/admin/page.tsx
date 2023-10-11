'use client';

import Header from "@/components/layout/header";
import AdminProfile from "@/components/mypage/adminProfile";
import AdminVoteItemList from "@/components/votelist/adminVoteItemList";

export default function MyPage() {
    return ( 
        <div>
            <Header />
            <AdminProfile />
        </div>
    )
}