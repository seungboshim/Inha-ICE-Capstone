import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getPolynomialRegression } from '@/apis/regression';
import { useState, useEffect } from 'react';

export default function TurnoutRegressionModal({ballotId}: any) {
    // const [poly, setPoly] = useState([]);

    // useEffect(() => {
    //     getPolynomialRegression().then((data) => {
    //         setPoly(data);
    //         console.log(poly);
    //     })
    // }, [])

    const regressionData = [
        {name: 1, uv: 2.1},
        {name: 2, uv: 5},
        {name: 3, uv: 8.1},
        {name: 4, uv: 11.942157842157702},
        {name: 5, uv: 15.952081252080998},
        {name: 6, uv: 20.035830835830513},
        {name: 7, uv: 24.099467199466833},
        {name: 8, uv: 28.04905094905059},
        {name: 9, uv: 31.79064269064236},
        {name: 10, uv: 35.23030303030278},
        {name: 11, uv: 38.27409257409245},
        {name: 12, uv: 40.82807192807198},
    ]

    return (
        <div className='my-4'>

                <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                        width={500}
                        height={200}
                        data={regressionData}
                        margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line connectNulls type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            
        </div>
    )
}