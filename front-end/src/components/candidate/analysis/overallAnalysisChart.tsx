import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";


interface props {
    barChartData: any
}

export default function OverallAnalysisChart({barChartData}:props) {
    return (
        <div className="w-full my-3.5">
            <ResponsiveContainer width="100%" height={140}>
                <BarChart data={barChartData}>
                    <XAxis dataKey="name"/>
                    <Tooltip />
                    <Bar dataKey="득표수" fill="#0094FF" barSize={30}/>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}