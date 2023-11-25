import { useState } from "react"
import OverallAnalysisChart from "./overallAnalysisChart";
import AgeGenderAnalysisChart from "./ageGenderAnalysisChart";
import RegionAnalysisChart from "./regionAnalysisChart";


export default function OverallAnalysisModal({overallData, ageGenderData, regionData}:any) {
    const [selectedTab, setSelectedTab] = useState('overall');
    
    const handleSelect = (tab: string) => {
        setSelectedTab(tab);
    }


    return (
        <div>
            <div className="flex px-1">
                <button 
                    className={`w-1/3 border-b-2 ${selectedTab === 'overall' ? `border-primary text-black font-bold` : `border-lightgrey text-semigrey`}`}
                    onClick={() => handleSelect('overall')}    
                >
                    <label>overall</label>
                </button>
                <button 
                    className={`w-1/3 border-b-2 ${selectedTab === '세대/성별' ? `border-primary text-black font-bold` : `border-lightgrey text-semigrey`}`}
                    onClick={() => handleSelect('세대/성별')}    
                >
                    <label>세대/성별</label>
                </button>
                <button 
                    className={`w-1/3 border-b-2 ${selectedTab === '지역' ? `border-primary text-black font-bold` : `border-lightgrey text-semigrey`}`}
                    onClick={() => handleSelect('지역')}    
                >
                    <label>지역</label>
                </button>
            </div>
            <div className="flex justify-center">
                {selectedTab === 'overall' && <OverallAnalysisChart barChartData={overallData}/>}
                {selectedTab === '세대/성별' && <AgeGenderAnalysisChart data={ageGenderData}/>}
                {selectedTab === '지역' && <RegionAnalysisChart data={regionData}/>}  
            </div>
        </div>
    )
}