import Image from "next/image"
import voteimg from "public/images/wrtFileImageView.png"

export default function VoteItem() {
    return (
        <div className="w-96 mx-2 border border-lightgrey shadow-lg rounded-lg">
            <div className="flex p-4">
                <Image src={voteimg} alt="투표 이미지" width={382} height={382} />
            </div>
            <div className="flex flex-col px-4 pb-4">
                <span className="text-lg font-bold">투표주제</span>
                <span>투표기간</span>
                <span>투표대상</span>
                <span>간략설명</span>
            </div>
        </div>
    )
}