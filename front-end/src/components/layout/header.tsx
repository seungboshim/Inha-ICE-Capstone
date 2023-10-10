'use client';

import React, { useEffect } from "react";
import { logout } from "../../apis/login";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "@/recoil/LoginAtom";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

    const router = useRouter();

    useEffect(() => {
        checkLoginStatus();
        
        // router.events.on('routeChangeComplete', checkLoginStatus);
        
        return () => {
            // router.events.off('routeChangeComplete', checkLoginStatus);
        };
    });

    const checkLoginStatus = () => {
        const token = localStorage.getItem('access');
        
        if (token) setIsLoggedIn(true);
        else setIsLoggedIn(false);
    };

    const handleLogout = () => {
        logout().then(() => {
            alert('로그아웃 되었습니다.');
            setIsLoggedIn(false);
            router.push('/')
        });
    };
    
    return (
        <div className="h-20 w-full flex items-center justify-between border-b shadow-md">
                <>
                    <div className="mx-4">
                        <Link href={'/ballot/ongoing'}>메인</Link>
                    </div>
                    <div className="mx-4 flex">
                        <Link href={'/mypage'}>
                            <div className="mx-4">마이페이지</div>
                            {/** TODO : 관리자일 경우 admin 마이페이지로 라우팅 */}
                        </Link>
                        <button
                            onClick={handleLogout}
                        >
                            로그아웃
                        </button>
                    </div>
                </>
        </div>
    )
}