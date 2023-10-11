import React, { useState, useEffect } from "react"
import Image from "next/image"
import { getMemberData } from "../../apis/member"
import Profile from "./profile";
import AdminVoteItemList from "../votelist/adminVoteItemList";
import Link from "next/link";
import { RiBarChartFill } from "react-icons/ri";

export default function AdminProfile() {
    return (
        <div className="flex flex-col items-center">
            <Profile />
            <AdminVoteItemList />
            <Link href={'/ballot/post'} className="flex border border-grey border-dashed rounded-lg p-2 m-4">
                <RiBarChartFill size={24} className="mr-4"/>
                새 투표 작성
            </Link>
        </div>
    )
}