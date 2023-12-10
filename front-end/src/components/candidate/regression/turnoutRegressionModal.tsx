import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryPortal, VictoryLabel } from 'victory';
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

    const trueData = [
        {name: "7시", 투표율: 2.1},
        {name: "8시", 투표율: 5},
        {name: "9시", 투표율: 8.1},
        {name: "10시", 투표율: 11.80},
        {name: "11시", 투표율: 16.00},
        {name: "12시", 투표율: 20.30},
        {name: "13시", 투표율: 24.37},
        {name: "14시", 투표율: 27.87},
        {name: "15시", 투표율: 31.17},
        {name: "16시", 투표율: 36.67},
        {name: "17시", 투표율: 38.77},
        {name: "18시", 투표율: 40.17},
    ]

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

    //const currentHour = new Date().getHours();
    //console.log(currentHour)
    const currentHour = 9;

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
                    domain={[0, 50]}
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
                    data={trueData}
                    //labels={({ datum }:any) => `${Number(datum.투표율).toFixed(2)}%`}
                    x="name"
                    y="투표율"
                    style={{
                        data: { stroke: "#FFBF00", opacity: 0.5, strokeWidth: 1 },
                        //labels: { fontSize: 6, fill: "#FFBF00" }
                    }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                />
                <VictoryPortal>
                    <>
                    {trueData.map((datum, index) => (
                        <VictoryLabel
                            key={index}
                            text={`${Number(datum.투표율).toFixed(2)}%`}
                            x={50 + 45.5*index}
                            y={120 - 7*index}
                            textAnchor="middle"
                            style={{ fontSize: 6, fill: "#FFBF00", opacity: 0.7 }}
                            dy={0}
                        />
                    ))}
                    </>
                </VictoryPortal>
                <VictoryLine 
                    data={dataBeforeCurrentHour}
                    labels={
                        ({ datum }:any) => `${Number(datum.투표율).toFixed(2)}%`
                    }
                    x="name"
                    y="투표율"
                    style={{
                        data: { stroke: "#0094FF", strokeWidth: 1 },
                        labels: { fontSize: 6, fill: "#0094FF" },
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
                        data: { stroke: "#0094FF", opacity: 0.5, strokeWidth: 1 },
                        labels: { fontSize: 6, fill: "#0094FF", opacity: 0.7 }
                    }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                />
            </VictoryChart>
            <div className='flex justify-center'>
                <div className='flex items-center'>
                    <div className='w-3 h-3 bg-primary mr-2'></div>
                    <span className='text-sm'>예측 값</span>
                </div>
                <div className='flex items-center ml-4'>
                    <div className='w-3 h-3 bg-truedata mr-2'></div>
                    <span className='text-sm'>실제 값</span>
                </div>
            </div>
        </div>
    )
}