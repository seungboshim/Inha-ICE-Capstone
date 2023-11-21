import React from "react"
import { Candidate } from "@/apis/types"
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
    candidate: Candidate
}

export default function AgeAnalysisModal({candidate}:Props) {
    const { ageGroupPercentage, ageGroupVoteCount } = candidate;

    const barChartData = [
        {
            name: "10대",
            votes: ageGroupVoteCount?.TEENS_OR_LESS
        },
        {
            name: "20대",
            votes: ageGroupVoteCount?.TWENTIES
        },
        {
            name: "30대",
            votes: ageGroupVoteCount?.THIRTIES
        },
        {
            name: "40대",
            votes: ageGroupVoteCount?.FORTIES
        },
        {
            name: "50대",
            votes: ageGroupVoteCount?.FIFTIES
        },
        {
            name: "60대",
            votes: ageGroupVoteCount?.SIXTIES
        },
        {
            name: "70대 이상",
            votes: ageGroupVoteCount?.SEVENTIES_OR_ABOVE
        },
    ]

    return (
        <div className="">
            <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={100}>
                    <BarChart data={barChartData}>
                        <XAxis dataKey="name"/>
                        <Tooltip />
                        <Bar dataKey="votes" fill="#0094FF" barSize={20}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            {/* {ageGroupPercentage && (
                <div>
                    <span>20대 득표율: {ageGroupPercentage.TWENTIES.toFixed(3)}%</span>
                </div>
            )}
            {ageGroupVoteCount && (
                <div>
                    <span>20대 득표수: {ageGroupVoteCount.TWENTIES}</span>
                </div>
            )} */}
        </div>
    )
}