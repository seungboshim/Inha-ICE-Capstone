import BannerComponent from "./bannerComponent";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getOrderdList, sendBannerStatus } from "@/apis/thompson";

export default function BannerWrap() {
    const router = useRouter();

    const pathname = usePathname();
    const ballotId = parseInt(pathname.split('/')[2]);

    const [orderdList, setOrderedList] = useState([]);
    const [successList, setSuccessList] = useState<number[]>([]);
    const [failureList, setFailureList] = useState([]);
    
    useEffect(() => {
        getOrderdList(ballotId).then((list) => {
            setOrderedList(list);
            setFailureList(list);
            //console.log(orderdList);
            //console.log(failureList);
        })
    }, [])

    const handleBannerClick = (banner: number) => {
        setSuccessList([...successList, banner]);
        setFailureList(failureList.filter(id => id !== banner));
    }

    useEffect(() => {
        console.log(successList);
        console.log(failureList);
    }, [successList, failureList])

    const handleSubmit = () => {
        sendBannerStatus(ballotId, successList, failureList);
        router.push(`/ballot/ongoing`);
    }

    return (
        <div className="flex justify-center mt-12">
            <div className="flex-col w-1/2 text-center">
                <span>투표와 관련한 기사를 둘러보세요.</span>
                {orderdList.map((banner) => {
                    return (
                        <div key={banner}>
                            <BannerComponent 
                                bannerId={banner}
                                handleClick={() => handleBannerClick(banner)}
                            />
                        </div>
                    )
                })}
                <button 
                    className="rounded-md bg-primary px-6 py-2"
                    onClick={handleSubmit}
                >
                    <span className="text-white">돌아가기</span>
                </button>
            </div>
        </div>
    )
}