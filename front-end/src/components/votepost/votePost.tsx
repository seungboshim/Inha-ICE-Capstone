import React, { useRef, useState } from "react";
import Image from "next/image";

export default function VotePost() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedImage, setSelectedImage] = useState<File>();

    /** 이미지를 selectedImages 배열에 저장 */
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setSelectedImage(selectedImage);
        }
    };


    return ( 
        <div className="lg:mx-96 md:mx-48 mx-4 mt-12 flex flex-col">
            <span className="font-bold text-2xl py-4 my-4 border-b border-grey w-1/2 md:w-1/3">투표 작성</span>
            <div className="flex items-center py-2">
                <div className="h-[150px] flex justify-center items-center border border-grey rounded-lg">
                    {/* 이미지 미리보기 */}
                    {selectedImage && 
                        <Image
                        src={URL.createObjectURL(selectedImage)} 
                        alt="이미지 미리보기" 
                        className="h-[150px]" 
                        />
                    }
                    {/* 파일 업로드 인풋 */}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={inputRef}
                        id="fileInput"
                        onChange={handleImageChange}
                    />
                    <label
                        htmlFor="fileInput"
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => inputRef.current && inputRef.current.click()}
                    >
                        <span className="text-grey mt-1">이미지를 업로드해주세요.</span>
                    </label>
                </div>
                <div className="flex">
                    <span className="pr-4">제목</span>
                    <div className="flex flex-grow p-2 border border-grey rounded-lg">
                        <input className="flex-grow"></input>
                    </div>
                </div>
            </div>
            
        </div>
    )
}