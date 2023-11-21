import React from "react"
import { Candidate } from "@/apis/types"
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
    candidate: Candidate
}

export default function GenderAnalysisModal({candidate}:Props) {
    const { genderPercentage, genderVoteCount } = candidate;

    const barChartData = [
        {
            name: "남성",
            votes: genderVoteCount?.MALE
        },
        {
            name: "여성",
            votes: genderVoteCount?.FEMALE
        }
    ]

    return (
        <div className="">
            <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={100}>
                    <BarChart data={barChartData}>
                        <XAxis dataKey="name"/>
                        <Tooltip />
                        <Bar dataKey="votes" fill="#0094FF" barSize={30}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            {/* {genderPercentage && (
                <div>
                    <span>남성 득표율: {genderPercentage.MALE.toFixed(3)}%</span>
                    <span>여성 득표율: {genderPercentage.FEMALE.toFixed(3)}%</span>
                </div>
            )}
            {genderVoteCount && (
                <div>
                    <span>남성 득표수: {genderVoteCount.MALE}표</span>
                    <span>여성 득표수: {genderVoteCount.FEMALE}표</span>
                </div>
            )} */}
        </div>
    )
}