import { useState } from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";


export default function RegionAnalysisChart({data}: any) {
    const [selectedTab, setSelectedTab] = useState('서울');
    
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

    const seoulData = data.map((candidate: any) => ({
        name: candidate.name,
        지지율: candidate.regionGroup["SEOUL"]
    }))

    const gyeonggiData = data.map((candidate: any) => ({
        name: candidate.name,
        지지율: candidate.regionGroup["GYEONGGI"]
    }))

    const incheonData = data.map((candidate: any) => ({
        name: candidate.name,
        지지율: candidate.regionGroup["INCHEON"]
    }))

    const gangwonData = data.map((candidate: any) => ({
        name: candidate.name,
        지지율: candidate.regionGroup["GANGWON"]
    }))

    const chungcheongbukData = data.map((candidate: any) => ({
        name: candidate.name,
        지지율: candidate.regionGroup["CHUNGCHEONGBUK"]
    }))

    const chungcheongNamData = data.map((candidate: any) => ({
        name: candidate.name,
        지지율: candidate.regionGroup["CHUNGCHEONGNAM"]
    }))

    const jeollaBukData = data.map((candidate: any) => ({
        name: candidate.name,
        지지율: candidate.regionGroup["JEOLLABUK"]
    }))

    const jeollaNamData = data.map((candidate: any) => ({
        name: candidate.name,
        지지율: candidate.regionGroup["JEOLLANAM"]
    }))

    const gyeongsangBukData = data.map((candidate: any) => ({
        name: candidate.name,
        지지율: candidate.regionGroup["GYEONGSANGBUK"]
    }))

    const gyeongsangNamData = data.map((candidate: any) => ({
        name: candidate.name,
        지지율: candidate.regionGroup["GYEONGSANGNAM"]
    }))

    return (
        <div className="w-full">
            <div className="flex justify-evenly my-2">
                {ageButton("서울")}
                {ageButton("경기")}
                {ageButton("인천")}
                {ageButton("강원")}
                {ageButton("충북")}
                {ageButton("충남")}
                {ageButton("전북")}
                {ageButton("전남")}
                {ageButton("경북")}
                {ageButton("경남")}
            </div>
            <div className="flex justify-center w-full">
                {selectedTab === "서울" && (
                    <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={seoulData}>
                            <XAxis dataKey="name"/>
                            <Tooltip />
                            <Bar dataKey="지지율" fill="#0094FF" barSize={15}/>
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {selectedTab === "경기" && (
                    <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={gyeonggiData}>
                            <XAxis dataKey="name"/>
                            <Tooltip />
                            <Bar dataKey="지지율" fill="#0094FF" barSize={15}/>
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {selectedTab === "인천" && (
                    <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={incheonData}>
                            <XAxis dataKey="name"/>
                            <Tooltip />
                            <Bar dataKey="지지율" fill="#0094FF" barSize={15}/>
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {selectedTab === "강원" && (
                    <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={gangwonData}>
                            <XAxis dataKey="name"/>
                            <Tooltip />
                            <Bar dataKey="지지율" fill="#0094FF" barSize={15}/>
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {selectedTab === "충북" && (
                    <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={chungcheongbukData}>
                            <XAxis dataKey="name"/>
                            <Tooltip />
                            <Bar dataKey="지지율" fill="#0094FF" barSize={15}/>
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {selectedTab === "충남" && (
                    <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={chungcheongNamData}>
                            <XAxis dataKey="name"/>
                            <Tooltip />
                            <Bar dataKey="지지율" fill="#0094FF" barSize={15}/>
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {selectedTab === "전북" && (
                    <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={jeollaBukData}>
                            <XAxis dataKey="name"/>
                            <Tooltip />
                            <Bar dataKey="지지율" fill="#0094FF" barSize={15}/>
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {selectedTab === "전남" && (
                    <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={jeollaNamData}>
                            <XAxis dataKey="name"/>
                            <Tooltip />
                            <Bar dataKey="지지율" fill="#0094FF" barSize={15}/>
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {selectedTab === "경북" && (
                    <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={gyeongsangBukData}>
                            <XAxis dataKey="name"/>
                            <Tooltip />
                            <Bar dataKey="지지율" fill="#0094FF" barSize={15}/>
                        </BarChart>
                    </ResponsiveContainer>
                )}
                {selectedTab === "경남" && (
                    <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={gyeongsangNamData}>
                            <XAxis dataKey="name"/>
                            <Tooltip />
                            <Bar dataKey="지지율" fill="#0094FF" barSize={15}/>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    )
}