import CandidateBannerComponent from "./candidateBannerComponent";
import { useState, useEffect } from "react";
import { getOrderedList, sendBannerStatus } from "@/apis/thompson";

interface props {
    candidateId: number
}

export default function CandidateBannerWrap({candidateId}: props) {

    const [orderdList, setOrderedList] = useState([]);
    const [displayedList, setDisplayedList] = useState<number[]>([]);
    const [successList, setSuccessList] = useState<number[]>([]);
    const [failureList, setFailureList] = useState([]);

    useEffect(() => {
        getOrderedList("candidate", candidateId).then((list) => {
            setOrderedList(list);
            setDisplayedList(list.slice(0, 3));
            setSuccessList([]); // successList 초기화
            setFailureList(list.slice(0, 3));
        })
    }, [candidateId])

    const handleBannerClick = (banner: number) => {
        setSuccessList([...successList, banner]);
        setFailureList(failureList.filter(id => id !== banner));
        //console.log(candidateId, banner)
    }

    useEffect(() => {
        console.log("누른거: "+successList);
        console.log("안누른거: "+failureList);
    }, [successList, failureList])

    const handleSubmit = () => {
        if (successList.length !== 0) {
            sendBannerStatus("candidate", candidateId, successList, failureList);
        }
    }

    useEffect(() => {
        handleSubmit();
    }, [candidateId])

    return (
        <div className="flex justify-center mt-4">
            <div className="flex-col w-4/5 text-center">
                <span>후보자와 관련한 정보를 둘러보세요.</span>
                {displayedList.map((banner) => {
                    return (
                        <div key={banner}>
                            <CandidateBannerComponent 
                                candidateId={candidateId}
                                bannerId={banner}
                                handleClick={() => handleBannerClick(banner)}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}