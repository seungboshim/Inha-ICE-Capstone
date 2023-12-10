import React from "react"
import { Candidate } from "@/apis/types"
import { BarChart, Bar, XAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Props {
    candidate: Candidate
}

export default function AgeGenderAnalysisModal({candidate}:Props) {
    const { ageGroupPercentage, ageGroupVoteCount } = candidate;

    const barChartData = [
        {
            name: "10대",
            남성: ageGroupPercentage?.TEENS_OR_LESS.MALE,
            여성: ageGroupPercentage?.TEENS_OR_LESS.FEMALE,
        },
        {
            name: "20대",
            남성: ageGroupPercentage?.TWENTIES.MALE,
            여성: ageGroupPercentage?.TWENTIES.FEMALE,
        },
        {
            name: "30대",
            남성: ageGroupPercentage?.THIRTIES.MALE,
            여성: ageGroupPercentage?.THIRTIES.FEMALE,
        },
        {
            name: "40대",
            남성: ageGroupPercentage?.FORTIES.MALE,
            여성: ageGroupPercentage?.FORTIES.FEMALE,
        },
        {
            name: "50대",
            남성: ageGroupPercentage?.FIFTIES.MALE,
            여성: ageGroupPercentage?.FIFTIES.FEMALE,
        },
        {
            name: "60대 이상",
            남성: ageGroupPercentage?.SIXTIES_OR_ABOVE.MALE,
            여성: ageGroupPercentage?.SIXTIES_OR_ABOVE.FEMALE,
        },
    ]

    return (
        <div className="">
            <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={120}>
                    <BarChart data={barChartData}>
                        <XAxis dataKey="name"/>
                        <Tooltip formatter={(value) => `${Number(value).toFixed(2)}%`}/>
                        <Legend />
                        <Bar dataKey="남성" fill="#004E7A" barSize={20} />
                        <Bar dataKey="여성" fill="#EE89A1" barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}