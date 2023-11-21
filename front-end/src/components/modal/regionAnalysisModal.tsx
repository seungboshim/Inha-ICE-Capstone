import React from "react"
import { Candidate } from "@/apis/types"
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
    candidate: Candidate
}

export default function RegionAnalysisModal({candidate}:Props) {
    const { regionPercentage, regionVoteCount } = candidate;

    const barChartData = [
        {
            name: "서울",
            votes: regionVoteCount?.SEOUL
        },
        {
            name: "경기",
            votes: regionVoteCount?.GYEONGGI
        },
        {
            name: "인천",
            votes: regionVoteCount?.INCHEON
        },
        {
            name: "강원",
            votes: regionVoteCount?.GANGWON
        },
        {
            name: "충북",
            votes: regionVoteCount?.CHUNGCHEONGBUK
        },
        {
            name: "충남",
            votes: regionVoteCount?.CHUNGCHEONGNAM
        },
        {
            name: "전북",
            votes: regionVoteCount?.JEOLLABUK
        },
        {
            name: "전남",
            votes: regionVoteCount?.JEOLLANAM
        },
        {
            name: "경북",
            votes: regionVoteCount?.GYEONGSANGBUK
        },
        {
            name: "경남",
            votes: regionVoteCount?.GYEONGSANGNAM
        },
    ]

    return (
        <div className="">
            <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={100}>
                    <BarChart data={barChartData}>
                        <XAxis dataKey="name"/>
                        <Tooltip />
                        <Bar dataKey="votes" fill="#0094FF" barSize={15}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            {/* {regionPercentage && (
                <div>
                    <span>강원 득표율: {regionPercentage.GANGWON.toFixed(3)}%</span>
                    <span>경기 득표율: {regionPercentage.GYEONGGI.toFixed(3)}%</span>
                </div>
            )}
            {regionVoteCount && (
                <div>
                    <span>강원 득표수: {regionVoteCount.GANGWON}표</span>
                    <span>경기 득표수: {regionVoteCount.GYEONGGI}표</span>
                </div>
            )} */}
        </div>
    )
}