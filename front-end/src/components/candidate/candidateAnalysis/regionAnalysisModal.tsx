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
            지지율: regionPercentage?.SEOUL
        },
        {
            name: "경기",
            지지율: regionPercentage?.GYEONGGI
        },
        {
            name: "인천",
            지지율: regionPercentage?.INCHEON
        },
        {
            name: "강원",
            지지율: regionPercentage?.GANGWON
        },
        {
            name: "충북",
            지지율: regionPercentage?.CHUNGCHEONGBUK
        },
        {
            name: "충남",
            지지율: regionPercentage?.CHUNGCHEONGNAM
        },
        {
            name: "전북",
            지지율: regionPercentage?.JEOLLABUK
        },
        {
            name: "전남",
            지지율: regionPercentage?.JEOLLANAM
        },
        {
            name: "경북",
            지지율: regionPercentage?.GYEONGSANGBUK
        },
        {
            name: "경남",
            지지율: regionPercentage?.GYEONGSANGNAM
        },
    ]

    return (
        <div className="">
            <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={100}>
                    <BarChart data={barChartData}>
                        <XAxis dataKey="name"/>
                        <Tooltip formatter={(value) => `${Number(value).toFixed(2)}%`}/>
                        <Bar dataKey="지지율" fill="#0094FF" barSize={15}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}