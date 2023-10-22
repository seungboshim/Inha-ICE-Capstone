'use client';

import React, { useEffect, useState } from "react";
import { logout } from "../../apis/login";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "@/recoil/LoginAtom";
import { getMemberData } from "@/apis/member";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    const [email, setEmail] = useState('');
    const router = useRouter();

    useEffect(() => {
        checkLoginStatus();
        
        // router.events.on('routeChangeComplete', checkLoginStatus);
        
        return () => {
            // router.events.off('routeChangeComplete', checkLoginStatus);
        };
    });

    useEffect(() => {
        getMemberData('memberEmail').then((memberEmail) => {
            setEmail(memberEmail);
        })
    }, [])

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
                        {email === "admin@gmail.com" ? (
                        <>
                            <Link href={'/mypage/admin'}>
                                <div className="mx-4">마이페이지</div>
                            </Link>
                        </>
                        ) : (
                        <>
                            <Link href={'/mypage'}>
                                <div className="mx-4">마이페이지</div>
                            </Link>                            
                        </>
                        )}
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