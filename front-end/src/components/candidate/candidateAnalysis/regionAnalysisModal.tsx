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
            votes: regionPercentage?.SEOUL
        },
        {
            name: "경기",
            votes: regionPercentage?.GYEONGGI
        },
        {
            name: "인천",
            votes: regionPercentage?.INCHEON
        },
        {
            name: "강원",
            votes: regionPercentage?.GANGWON
        },
        {
            name: "충북",
            votes: regionPercentage?.CHUNGCHEONGBUK
        },
        {
            name: "충남",
            votes: regionPercentage?.CHUNGCHEONGNAM
        },
        {
            name: "전북",
            votes: regionPercentage?.JEOLLABUK
        },
        {
            name: "전남",
            votes: regionPercentage?.JEOLLANAM
        },
        {
            name: "경북",
            votes: regionPercentage?.GYEONGSANGBUK
        },
        {
            name: "경남",
            votes: regionPercentage?.GYEONGSANGNAM
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
        </div>
    )
}