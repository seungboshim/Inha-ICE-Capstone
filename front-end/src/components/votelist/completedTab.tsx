import Link from "next/link"

export default function CompletedTab() {
    return (
        <div className="mx-4 mt-12 mb-12 flex">
            <Link href={'/ballot/ongoing'} className="w-1/2">
                <div className="border-b-2 border-grey py-6 text-left">
                    <span className="text-grey">
                        진행중인 투표
                    </span>

                </div>
            </Link>
            <Link href={'/ballot/completed'} className="w-1/2">
                <div className="border-b-2 border-primary py-6 text-left">
                    <span className="font-bold text-primary">
                        완료된 투표
                    </span>
                </div>
            </Link>
        </div>
    )
}