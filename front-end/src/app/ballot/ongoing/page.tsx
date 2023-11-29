'use client';

import Header from "@/components/layout/header";
import OngoingTab from "../../../components/votelist/ongoingTab"
import OngoingVoteItemList from "@/components/votelist/ongoingVoteItemList";
import { useHandleToken } from "@/recoil/utils/handleToken";
import { isAdminState } from "@/recoil/atoms/LoginAtom";
import { useRecoilState } from "recoil";

export default function Ongoing() {
    // 메인페이지에서 isAdmin 상태 갱신함
    const [isAdmin, setIsAdmin] = useRecoilState(isAdminState);

    useHandleToken(setIsAdmin)
    console.log(isAdmin)

    return (
        <>
        <Header />
        <div className="mx-4 md:mx-24">
            <OngoingTab />
            <OngoingVoteItemList />
        </div>
        </>
    )
}