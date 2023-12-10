import React, { useState, useEffect, useRef } from "react";
import { getBallotData } from "@/apis/ballots";
import { Candidate } from "@/apis/types";
import { Server } from "@/apis/setting";
import Image from "next/image";
import { RiFileAddFill } from "react-icons/ri";
import { AiFillPlusCircle } from "react-icons/ai"
import { useRecoilState } from "recoil";
import { isModalState, isLoadingState } from "@/recoil/atoms/ModalAtom";
import { createBandits } from "@/apis/thompson";

export default function AdminCandidatesModal({ ballotId }: any) {
    const [modal, setModal] = useRecoilState(isModalState);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
    const [selectedCandidateId, setSelectedCandidateId] = useState(0);

    useEffect(() => {
        getBallotData(ballotId, 'candidates').then((candi) => {
            setCandidates(candi);
        });
    }, [ballotId])

    const [formData, setFormData] = useState({
        ballotId: ballotId,
        candidateName: ""
    })

    const [validationError, setValidationError] = useState({
        nameError: false,
    })

    const handleChange = (e: any) => {
        let value = e.target.value;
        if (value === "null") {
            value = null;
        }
        
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setIsLoading(true);
        console.log(isLoading)
        // setModal(false);
        const isNameValid = formData.candidateName.trim() !== "";

        setValidationError({
            nameError: !isNameValid,
        })

        if (isNameValid) {
            const dataToSend = new FormData();
            const formDataString = JSON.stringify(formData);
            // ballotRequestDto

            const blob = new Blob([formDataString], { type: "application/json" });
            dataToSend.append('candidateRequestDto', blob);
            // ballotImage
            if (selectedImage) {
                dataToSend.append('candidateImage', selectedImage);
            }

            for (let pair of dataToSend.entries()) {
                console.log(pair[0], pair[1]);
            }

            try {
                const response = await Server.post('/admins/voting/candidates', dataToSend);
                // console.log(response.data);  // 응답 데이터 확인
    
                // TODO : 후보자 작성 후 모달창 닫기?

            } catch (error: any) {
                console.error(error);
                if (error.response) {
                    alert(error.response.data.message);
                }
            }
        } else {
            setValidationError({
                nameError: !isNameValid,
            })
        }
    }



    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedImage, setSelectedImage] = useState<File>();

    /** 이미지를 selectedImage에 저장 */
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
          setSelectedImage(e.target.files[0]);
        }
    };

    /** selectedImage를 지우기 */
    const handleRemoveImage = () => {
        setSelectedImage(undefined);
    };

    const handleSelect = (candidateId: number) => {
        setSelectedCandidateId(candidateId);
    }

    // useEffect(() => {
    //     console.log(`${selectedCandidateId} 선택`)
    // }, [handleSelect])

    let createdBanners = [1, 2, 3, 4, 5];

    const handleAddBandits = (candidateId: number) => {
        createBandits("candidate", candidateId, createdBanners);
        alert(`후보자 배너 추가 완료!`)
    }

    return (
        <div className="flex flex-col items-center mx-4 my-4">
            {candidates.length > 0 && (
                <div className="w-full md:w-3/5 md:justify-start"> 
                    {candidates.map((candidate) => (
                        <div key={candidate.candidateId} className="flex h-24 items-center justify-between px-4 py-2 border border-grey rounded-lg my-2">
                            <div className="flex items-center">
                                <Image src={candidate.candidateImage} alt={candidate.candidateName} width={56} height={56} objectFit="contain" className="mr-4"/>
                                <span>{candidate.candidateName}</span>
                            </div>
                            <AiFillPlusCircle 
                                size={24} 
                                className="opacity-50 cursor-pointer"
                                onClick={() => {
                                    handleAddBandits(candidate.candidateId);
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}
            <div className="flex mx-4 my-2 w-full md:w-1/3 md:justify-start items-center">
                <div className="mr-4">
                    <div className="w-20 h-20 border border-grey rounded-lg flex justify-center items-center">
                        {selectedImage ? (
                            <>
                                <button onClick={handleRemoveImage}>
                                {/* 선택된 이미지가 있을 때 이미지 미리보기 출력 */}
                                <Image src={URL.createObjectURL(selectedImage)} alt="thumbnail" width={80} height={80} />
                                </button>
                            </>
                        ) : (
                            // 선택된 이미지가 없을 때 파일 첨부 아이콘 출력
                            <>
                                {/* 파일 업로드 인풋 */}
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    ref={inputRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                {/* 파일 첨부 버튼 */}
                                {/* onClick 이벤트 핸들러에서 inputRef.current?.click()으로 파일 업로드 인풋 클릭 */}
                                <label 
                                    htmlFor={`fileInput`} 
                                    onClick={() => inputRef.current && inputRef.current.click()}
                                >
                                    <RiFileAddFill size={24} className="opacity-50" />
                                </label>							
                            </>
                        )}
                    </div>
                </div>
                <div className="flex-grow">
                    <div className={`flex p-2 border-b ${validationError.nameError ? 'border-warning' : 'border-grey'}`}>
                        <input 
                            className={`flex-grow ${validationError.nameError ? 'placeholder-warning' : 'placeholder-grey' }`}
                            type="text"
                            name="candidateName"
                            value={formData.candidateName}
                            onChange={handleChange}
                            placeholder="이름을 입력해주세요."
                        ></input>
                    </div>
                </div>
            </div>
            <button className="" onClick={handleSubmit}>
                <AiFillPlusCircle size={24} className="" />
            </button>
        </div>
    )
}