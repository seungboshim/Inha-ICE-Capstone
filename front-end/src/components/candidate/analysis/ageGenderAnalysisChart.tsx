import { useState } from "react";
import { BarChart, Bar, XAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function AgeGenderAnalysisChart({data}: any) {
    const [selectedTab, setSelectedTab] = useState('10대 이하');
    
    const handleSelect = (tab: string) => {
        setSelectedTab(tab);
    }

    function ageButton(label: string) {
        return (
            <button
                className={`px-4 py-1 rounded-full ${label === selectedTab ? `text-white bg-primary` : `text-black`} cursor-pointer`}
                onClick={() => handleSelect(label)}
            >  
                {label}
            </button>
        )
    }

    const teenagerData = data.map((candidate: any) => ({
        name: candidate.name,
        남성: candidate.ageGroup["TEENS_OR_LESS"].MALE,
        여성: candidate.ageGroup["TEENS_OR_LESS"].FEMALE
    }))

    const twentiesData = data.map((candidate: any) => ({
        name: candidate.name,
        남성: candidate.ageGroup["TWENTIES"].MALE,
        여성: candidate.ageGroup["TWENTIES"].FEMALE
    }))

    const thirtiesData = data.map((candidate: any) => ({
        name: candidate.name,
        남성: candidate.ageGroup["THIRTIES"].MALE,
        여성: candidate.ageGroup["THIRTIES"].FEMALE
    }))

    const fortiesData = data.map((candidate: any) => ({
        name: candidate.name,
        남성: candidate.ageGroup["FORTIES"].MALE,
        여성: candidate.ageGroup["FORTIES"].FEMALE
    }))

    const fiftiesData = data.map((candidate: any) => ({
        name: candidate.name,
        남성: candidate.ageGroup["FIFTIES"].MALE,
        여성: candidate.ageGroup["FIFTIES"].FEMALE
    }))

    const seniorData = data.map((candidate: any) => ({
        name: candidate.name,
        남성: candidate.ageGroup["SIXTIES_OR_ABOVE"].MALE,
        여성: candidate.ageGroup["SIXTIES_OR_ABOVE"].FEMALE
    }))


    return (
        <div className="w-full">
            <div className="flex justify-evenly my-2">
                {ageButton("10대 이하")}
                {ageButton("20대")}
                {ageButton("30대")}
                {ageButton("40대")}
                {ageButton("50대")}
                {ageButton("60대 이상")}
            </div>
            <div className="flex justify-center w-full">
                {selectedTab === "10대 이하" && (
                    <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={teenagerData}>
                            <XAxis dataKey="name"/>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="남성" fill="#004E7A" barSize={20} />
                            <Bar dataKey="여성" fill="#EE89A1" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {selectedTab === "20대" && (
                    <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={twentiesData}>
                            <XAxis dataKey="name"/>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="남성" fill="#004E7A" barSize={20} />
                            <Bar dataKey="여성" fill="#EE89A1" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {selectedTab === "30대" && (
                    <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={thirtiesData}>
                            <XAxis dataKey="name"/>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="남성" fill="#004E7A" barSize={20} />
                            <Bar dataKey="여성" fill="#EE89A1" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {selectedTab === "40대" && (
                    <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={fortiesData}>
                            <XAxis dataKey="name"/>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="남성" fill="#004E7A" barSize={20} />
                            <Bar dataKey="여성" fill="#EE89A1" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {selectedTab === "50대" && (
                    <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={fiftiesData}>
                            <XAxis dataKey="name"/>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="남성" fill="#004E7A" barSize={20} />
                            <Bar dataKey="여성" fill="#EE89A1" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {selectedTab === "60대 이상" && (
                    <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={seniorData}>
                            <XAxis dataKey="name"/>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="남성" fill="#004E7A" barSize={20} />
                            <Bar dataKey="여성" fill="#EE89A1" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>

        </div>
    )
}