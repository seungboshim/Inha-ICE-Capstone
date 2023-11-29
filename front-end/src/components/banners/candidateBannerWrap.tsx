import CandidateBannerComponent from "./candidateBannerComponent";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getOrderedList, sendBannerStatus } from "@/apis/thompson";

export default function CandidateBannerWrap(candidateId: any) {
    const router = useRouter();

    const [orderdList, setOrderedList] = useState([]);
    const [successList, setSuccessList] = useState<number[]>([]);
    const [failureList, setFailureList] = useState([]);
    

    useEffect(() => {
        getOrderedList("candidate", candidateId).then((list) => {
            setOrderedList(list);
            setFailureList(list);
            //console.log(orderdList);
            //console.log(failureList);
        })
    }, [])

    const handleBannerClick = (banner: number) => {
        setSuccessList([...successList, banner]);
        setFailureList(failureList.filter(id => id !== banner));
        //console.log(candidateId, banner)
    }

    // useEffect(() => {
    //     console.log(successList);
    //     console.log(failureList);
    // }, [successList, failureList])

    const handleSubmit = () => {
        sendBannerStatus("candidate", candidateId, successList, failureList);
    }

    useEffect(() => {
        handleSubmit();
    }, [candidateId])

    return (
        <div className="flex justify-center mt-4">
            <div className="flex-col w-4/5 text-center">
                <span>후보자와 관련한 기사를 둘러보세요.</span>
                {orderdList.map((banner) => {
                    return (
                        <div key={banner}>
                            <CandidateBannerComponent 
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