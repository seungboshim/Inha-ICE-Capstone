import Image from "next/image"
import memberImage from "public/images/memberImage.png"
export default function Profile() {
    return (
        <div className="mt-12 flex justify-center">
            <div className="flex flex-col items-center">
            <Image src={memberImage} alt="memberImage" width={128}/>
            <div className="py-4 flex flex-col text-center">
            <span>이름</span>
            <span>닉네임</span>
            <span>이메일@gmail.com</span>
            <span>1999-01-28 {`(24세)`}</span>
            <span>남성</span>
            <span>경기도</span>
            </div>
            </div>
        </div>
    )
}