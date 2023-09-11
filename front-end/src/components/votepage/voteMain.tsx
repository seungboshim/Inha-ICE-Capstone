import Image from "next/image"
import voteimg from "public/images/wrtFileImageView.png"

export default function VoteMain() {
    const VoteButton = () => {
        return (
            <div>
                <button className="w-40 h-20 bg-primary rounded-lg">
                    <span className="text-xl font-bold text-white">투표하기</span>
                </button>
            </div>
        )
    }

    return (
        <div className="flex mx-4 mt-12 justify-between">
            <div className="flex w-1/4 items-center"> 
                <Image src={voteimg} alt="투표이미지" className="w-full object-cover aspect-w-1 aspect-h-1 shadow-md rounded-lg" />
            </div>
            <div className="flex w-3/4 flex-col ml-4 justify-between">
                <div className="flex flex-col">
                    <span className="font-bold text-2xl">넷플릭스 컨텐츠 중 최고는?</span>
                    <span className="py-4 border-b border-primary">넷플릭스에서 시청한 드라마, 영화 중 당신의 최고는?</span>
                    <div className="flex justify-end py-4 mb-8">
                        <div className="flex flex-col font-bold">
                            <span>투표 기간</span>
                            <span>투표 대상</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-end">
                    <span className="mr-4">상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 상세 설명 </span>
                    <VoteButton />
                </div>
            </div>
        </div>
    )
}