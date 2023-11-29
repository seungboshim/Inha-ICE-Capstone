import React, { useState } from "react"
import Link from "next/link";
import { getAccessRefreshToken } from "../../apis/login";
import { useRouter } from "next/navigation";

export default function LoginInput() {
    const [memberEmail, setMemberEmail] = useState<String>();
    const [memberPassword, setMemberPassword] = useState<String>();


    const router = useRouter();

    async function handleLogin() {
        try {
            const result: any = await getAccessRefreshToken({memberEmail, memberPassword});
            // console.log(result)
            if (result) {
                // 로그인 하면 일반 회원인지 admin인지 상태 갱신
                router.push('/ballot/ongoing')
            }
        } catch(error) {
            console.error("로그인 실패", error);
        }
    }


    return (
        <div className="flex justify-center">
            <div className="flex-col">
                <div className="flex-col">
                    <div className="flex p-4 border-b-2 border-primary w-[360px]">
                        <span className="font-bold text-lg text-primary pr-8">ID</span>
                        <input 
                            className="flex flex-grow"
                            onChange={(e) => {setMemberEmail(e.target.value)}}
                        />
                    </div>
                    <div className="flex p-4 border-b-2 border-grey w-[360px]">
                        <span className="font-bold text-lg text-grey pr-4">PW</span>
                        <input 
                            type="password" 
                            className="flex flex-grow"
                            onChange={(e) => {setMemberPassword(e.target.value)}}
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col">
                        <button 
                            className={`w-[240px] py-2 my-4 rounded-xl bg-primary`}
                            onClick={handleLogin}
                        >               
                                <span className={`font-bold text-white`}>
                                    로그인
                                </span>
                        </button>
                        <Link href={'/join'} className="text-center">
                            <button 
                                className="text-bold text-grey"
                            >
                                    회원가입
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}