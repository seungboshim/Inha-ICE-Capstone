import Link from "next/link"

export default function Header() {
    return (
        <div className="h-20 w-full flex items-center justify-between order-b shadow-md">
            <div className="mx-4">
                <Link href={'/'}>메인</Link>
            </div>
            <div className="mx-4 flex">
                <Link href={'/mypage'}>
                    <div className="mx-4">마이페이지</div>
                </Link>
                <Link href={'/'}>
                    <div>로그아웃</div>
                </Link>
            </div>
        </div>
    )
}