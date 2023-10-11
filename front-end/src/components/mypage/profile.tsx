import React, { useState, useEffect } from "react"
import Image from "next/image"
import { getMemberData } from "../../apis/member"

export default function Profile() {
    const [name, setName] = useState('');
    const [nickName, setNickName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState<Date>();
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [region, setRegion] = useState('');
    const [memImg, setMemImg] = useState('');

    useEffect(() => {
        getMemberData('memberName').then((memberName) => {
            setName(memberName);
        })
        getMemberData('memberNickName').then((memberNickName) => {
            setNickName(memberNickName);
        })
        getMemberData('memberEmail').then((memberEmail) => {
            setEmail(memberEmail);
        })
        getMemberData('memberBirthDate').then((memberBirthDate) => {
            setBirthDate(memberBirthDate);
        })
        getMemberData('memberAge').then((memberAge) => {
            setAge(memberAge);
        })
        getMemberData('memberGender').then((memberGender) => {
            setGender(memberGender);
        })
        getMemberData('memberRegion').then((memberRegion) => {
            setRegion(memberRegion);
        })
        getMemberData('memberImage').then((memberImg) => {
            setMemImg(memberImg);
        })
    }, [])

    return (
        <div className="mt-12 flex justify-center">
            <div className="flex flex-col items-center">
                {memImg && (
                    <>
                        <Image 
                        src={memImg} 
                        alt="memberImage" 
                        width={128} 
                        height={128}
                        placeholder="blur"
                        blurDataURL={memImg}
                        />
                    </>
                )}
                <div className="py-4 flex flex-col text-center">
                    <span>{name}</span>
                    <span>{nickName}</span>
                    <span>{email}</span>
                    <span>{birthDate} {`[${age}세]`}</span>
                    <span>{gender}</span>
                    <span>{region}</span>
                </div>
                <div>
                <button className="px-8 py-4 mb-8 rounded-lg bg-primary text-white">
                    수정하기
                </button>
                </div>
            </div>
        </div>
    )
}