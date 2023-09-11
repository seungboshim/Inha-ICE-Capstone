import Link from "next/link"
import LoginButton from "./loginButton"

export default function LoginButtons() {
    return (
        <div className="flex justify-center mt-24">
            <div className="flex flex-col">
                <Link href={'/vote/ongoing'} className="mb-3">
                <LoginButton 
                    label="로그인"
                    bgColor="bg-primary"
                    textColor="text-white"
                />
                </Link>
                <LoginButton 
                    label="카카오로 시작하기"
                    bgColor="bg-kakaoyellow"
                    textColor="text-kakaodark"
                />
                <div className="mt-3 text-center">
                    <button className="text-bold text-grey">
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    )
}