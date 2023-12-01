import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, Style } from 'victory';
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
        {name: "7시", 투표율: 2.1},
        {name: "8시", 투표율: 5},
        {name: "9시", 투표율: 8.1},
        {name: "10시", 투표율: 11.942157842157702},
        {name: "11시", 투표율: 15.952081252080998},
        {name: "12시", 투표율: 20.035830835830513},
        {name: "13시", 투표율: 24.099467199466833},
        {name: "14시", 투표율: 28.04905094905059},
        {name: "15시", 투표율: 31.79064269064236},
        {name: "16시", 투표율: 35.23030303030278},
        {name: "17시", 투표율: 38.27409257409245},
        {name: "18시", 투표율: 40.82807192807198},
    ]

    const currentHour = new Date().getHours();
    console.log(currentHour)
    //const currentHour = 10;

    const dataBeforeCurrentHour = regressionData.filter(data => parseInt(data.name) <= currentHour);
    const dataAfterCurrentHour = regressionData.filter(data => parseInt(data.name) > currentHour);
    if (dataBeforeCurrentHour.length > 0) {
        dataAfterCurrentHour.unshift(dataBeforeCurrentHour[dataBeforeCurrentHour.length - 1]);
    }

    // const minY = Math.min(...regressionData.map(data => data.투표율));
    // const maxY = Math.max(...regressionData.map(data => data.투표율));

    return (
        <div className='my-4 lg:mx-20'>
            <VictoryChart 
                theme={VictoryTheme.material}
                width={600}
                height={200}
            >
                <VictoryAxis dependentAxis 
                    domain={[0, 100]}
                    style={{ 
                        tickLabels: { fontSize: 8 },
                        axis: { strokeWidth: 1 }
                    }}
                />
                <VictoryAxis crossAxis
                    style={{ 
                        tickLabels: { fontSize: 8 }, 
                        axis: { strokeWidth: 1 }
                    }}
                />
                <VictoryLine 
                    data={dataBeforeCurrentHour}
                    labels={
                        ({ datum }:any) => `${Number(datum.투표율).toFixed(2)}%`
                    }
                    x="name"
                    y="투표율"
                    style={{
                        data: { stroke: "#0094FF", strokeWidth: 1 },
                        labels: { fontSize: 6 },
                    }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                />
                <VictoryLine 
                    data={dataAfterCurrentHour}
                    labels={({ datum }:any) => `${Number(datum.투표율).toFixed(2)}%`}
                    x="name"
                    y="투표율"
                    style={{
                        data: { stroke: "#0094FF", opacity: 0.3, strokeWidth: 1 },
                        labels: { fontSize: 6 }
                    }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                />
            </VictoryChart>
                {/* <ResponsiveContainer width="100%" height={200}>
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
                        <YAxis domain={[0, 100]} />
                        <Tooltip formatter={(value) => `${Number(value).toFixed(2)}%`} />
                        <Line connectNulls 
                            type="monotone" dataKey="투표율" stroke="#0094FF" fill="#0094FF" 
                            className={`${parseInt(regressionData[0].name) > currentHour ? 'opacity-50' : 'opacity-100'}`}
                        />
                    </LineChart>
                </ResponsiveContainer> */}
                {/* <ResponsiveContainer width="50%" height={200}>
                    <LineChart
                        width={500}
                        height={200}
                        data={dataAfterCurrentHour}
                        margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} className='hidden'/>
                        <Tooltip formatter={(value) => `${Number(value).toFixed(2)}%`} />
                        <Line connectNulls type="monotone" dataKey="투표율" stroke="#0094FF" fill="#0094FF" className='opacity-50'/>
                    </LineChart>
                </ResponsiveContainer> */}
        </div>
    )
}