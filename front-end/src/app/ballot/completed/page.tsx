'use client';

import Header from "@/components/layout/header";
import CompletedTab from "../../../components/votelist/completedTab";

export default function Completed() {
    return (
        <>
        <Header />
        <div className="mx-24">
            <CompletedTab />
        </div>
        </>
    )
}