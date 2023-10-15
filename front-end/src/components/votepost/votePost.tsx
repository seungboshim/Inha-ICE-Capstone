import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { RiFileAddFill } from "react-icons/ri"
// import { AiOutlineCalendar } from 'react-icons/ai';
// import format from 'date-fns/format';
// import Calendar from "./calendar";
import { Server } from "@/apis/setting";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function VotePost() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        ballotName: "",
        ballotStartDateTime: "",
        ballotEndDateTime: "",
        ballotMinAge: 0,
        ballotMaxAge: 0,
        ballotSubjectRegion: "",
        ballotSubjectGender: "",
        ballotBriefDescription: "",
        ballotDetailDescription: ""
    })

    const [validationErrors, setValidationErrors] = useState({
        nameError: false,
        briefDescriptionError: false,
        startDateTimeError: false,
        endDateTimeError: false,
        subjectAgeError: false,
        subjectRegionError: false,
        subjectGenderError: false,
        detailDescriptionError: false,
    });

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

    /** formData 제출 */
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // 이름 입력창이 비어있지 않으면 isNameValid === true
        const isNameValid = formData.ballotName.trim() !== "";
        const isBriefDescriptionValid = formData.ballotBriefDescription.trim() !== "";
        const isStartDateTimeValid = formData.ballotStartDateTime.trim() !== "";
        const isEndDateTimeValid = formData.ballotEndDateTime.trim() !== "";
        const isSubjectAgeValid = formData.ballotMinAge !== 0 && formData.ballotMaxAge !== 0 && formData.ballotMinAge <= formData.ballotMaxAge;
        const isGenderValid = formData.ballotSubjectGender.trim() !== "";
        const isRegionValid = formData.ballotSubjectRegion.trim() !== "";
        const isDetailDescriptionValid = formData.ballotDetailDescription.trim() !== "";

        setValidationErrors({
            nameError: !isNameValid,
            briefDescriptionError : !isBriefDescriptionValid,
            startDateTimeError : !isStartDateTimeValid,
            endDateTimeError : !isEndDateTimeValid,
            subjectAgeError : !isSubjectAgeValid,
            subjectGenderError : !isGenderValid,
            subjectRegionError : !isRegionValid,
            detailDescriptionError : !isDetailDescriptionValid,
        });

        const isAllValid = isNameValid && isBriefDescriptionValid && isStartDateTimeValid 
        && isEndDateTimeValid && isSubjectAgeValid && isGenderValid 
        && isRegionValid && isDetailDescriptionValid;

        const updatedFormData = {
            ...formData,
            ballotStartDateTime: `${formData.ballotStartDateTime}T00:00:00`,
            ballotEndDateTime: `${formData.ballotEndDateTime}T00:00:00`
        };

        // 검증 완료시
        if (isAllValid) {

            const dataToSend = new FormData();
            const formDataString = JSON.stringify(updatedFormData);
            // ballotRequestDto

            const blob = new Blob([formDataString], { type: "application/json" });
            dataToSend.append('ballotRequestDto', blob);
            // ballotImage
            if (selectedImage) {
                dataToSend.append('ballotImage', selectedImage);
            }

            for (let pair of dataToSend.entries()) {
                console.log(pair[0], pair[1]);
            }

            // Server.post('/admins/voting/ballots', dataToSend)
            //     .then(response => {
            //         console.log(response.data)
            //     })
            //     .catch(error => {
            //         console.error(error)
            //         alert(error.response.data.message)
            //     })

            try {
                const response = await Server.post('/admins/voting/ballots', dataToSend);
                console.log(response.data);  // 응답 데이터 확인
    
                // TODO : 투표글 작성 후 라우팅할 주소
                // router.push({`/ballot/${response.data}`})
            } catch (error: any) {
                console.error(error);
                alert(error.response.data.message);
            }
        } else {
            setValidationErrors({
                nameError: !isNameValid,
                briefDescriptionError : !isBriefDescriptionValid,
                startDateTimeError : !isStartDateTimeValid,
                endDateTimeError : !isEndDateTimeValid,
                subjectAgeError : !isSubjectAgeValid,
                subjectGenderError : !isGenderValid,
                subjectRegionError : !isRegionValid,
                detailDescriptionError : !isDetailDescriptionValid
            });
        }
    };

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

    // const [startDate, setStartDate] = useState<null | Date>(null);
    // const [endDate, setEndDate] = useState<null | Date>(null);
    // const [isOpen, setIsOpen] = useState<boolean>(false);
    // const SelectDates = ({
    //     title,
    //     value
    // }: {
    //     title: null | string;
    //     value: null | Date;
    // }) => {
    //     return (
    //         <div
    //             onClick={(e: React.MouseEvent<HTMLElement>) => {
    //                 e.preventDefault();
    //                 setIsOpen(!isOpen);
    //             }}
    //             className='flex items-center justify-between w-1/2 text-grey border border-lightgrey rounded-md p-5 mx-1.5 my-4 hover:cursor-pointer'
    //         >
    //             {value === null ? title : format(value, 'yyyy.MM.dd')}
    //             <AiOutlineCalendar size={24} />
    //         </div>
    //     );
    // };

    return ( 
        <div className="mx-8 md:mx-24 my-12 flex flex-col justify-center">
            <span className="font-bold text-2xl py-4 my-8 border-b border-grey w-1/2 md:w-1/3">투표 작성</span>
            <div className="flex flex-col w-full h-full mb-8">
                <div className="items-center mb-8">
                    <span className={`${validationErrors.nameError ? 'text-warning' : 'text-grey'} mb-2`}>제목을 입력해주세요.</span>
                    <div className={`flex flex-grow p-2 border ${validationErrors.nameError ? 'border-warning' : 'border-grey'} rounded-lg`}>
                        <input 
                            className="flex-grow"
                            type="text"
                            name="ballotName"
                            value={formData.ballotName}
                            onChange={handleChange}
                        ></input>
                    </div>
                </div>
                <div className="items-center mb-8">
                    <span className={`${validationErrors.briefDescriptionError ? 'text-warning' : 'text-grey'}`}>간단한 설명을 써주세요.</span>
                    <div className={`flex p-2 border ${validationErrors.briefDescriptionError ? 'border-warning' : 'border-grey'} rounded-lg`}>
                        <textarea 
                            className="flex-grow"
                            name="ballotBriefDescription"
                            value={formData.ballotBriefDescription}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row mb-8">
                    <div className="flex-col mb-4 md:mb-0">
                        <span className="text-grey">대표 이미지 첨부</span>
                        <div className="w-full md:w-48 h-48 border border-grey rounded-lg flex justify-center items-center">
                            {selectedImage ? (
                                <>
                                    <button onClick={handleRemoveImage}>
                                    {/* 선택된 이미지가 있을 때 이미지 미리보기 출력 */}
                                    <Image src={URL.createObjectURL(selectedImage)} alt="thumbnail" width={160} height={160} />
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
                                        <RiFileAddFill size={48} className="opacity-50" />
                                    </label>							
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col md:ml-4 ml-0 flex-grow justify-between">
                        <div className="">
                            <span className={`${validationErrors.startDateTimeError || validationErrors.endDateTimeError ? 'text-warning' : 'text-grey'}`}>투표 기간을 설정해주세요.</span>
                            <div className="flex mb-4">
                                <input
                                    className={`p-4 border ${validationErrors.startDateTimeError ? 'border-warning' : 'border-grey'} rounded-lg flex-grow mr-4`}
                                    type="date"
                                    name="ballotStartDateTime"
                                    value={`${formData.ballotStartDateTime}`}
                                    onChange={handleChange}
                                />
                                <input
                                    className={`p-4 border ${validationErrors.endDateTimeError ? 'border-warning' : 'border-grey'} rounded-lg flex-grow`}
                                    type="date"
                                    name="ballotEndDateTime"
                                    value={`${formData.ballotEndDateTime}`}
                                    onChange={handleChange}                                
                                />
                                {/* <SelectDates title='시작일' value={startDate} />
                                <SelectDates title='마감일' value={endDate} />
                                <Calendar 
                                    startDate={startDate}
                                    endDate={endDate}
                                    isOpen={isOpen}
                                    setStartDate={setStartDate}
                                    setEndDate={setEndDate}
                                    setIsOpen={setIsOpen}
                                    claName={isOpen ? 'block absolute ml-[320px] z-10' : 'hidden'}                                
                                /> */}
                            </div>
                        </div>
                        <div className="">
                            <span className={`${validationErrors.subjectAgeError || validationErrors.subjectGenderError || validationErrors.subjectRegionError ? 'text-warning' : 'text-grey'}`}>투표 대상을 설정해주세요.</span>
                            <div className="flex">
                                <div className={`flex w-3/5 p-4 border ${validationErrors.subjectAgeError ? 'border-warning' : 'border-grey'} rounded-lg flex-grow mr-4`}>
                                    <input 
                                        className="w-2/5 text-center"
                                        type="text"
                                        name="ballotMinAge"
                                        value={formData.ballotMinAge}
                                        onChange={handleChange}
                                    />
                                    <span className="">세 ~</span>
                                    <input 
                                        className="w-2/5 text-center"
                                        type="text"
                                        name="ballotMaxAge"
                                        value={formData.ballotMaxAge}
                                        onChange={handleChange}
                                    />
                                    <span>세</span>
                                </div>
                                <select
                                    className={`w-1/5 p-4 border ${validationErrors.subjectRegionError ? 'border-warning' : 'border-grey'} rounded-lg flex-grow mr-4`}
                                    name="ballotSubjectRegion"
                                    value={formData.ballotSubjectRegion}
                                    
                                    onChange={handleChange}
                                >
                                    <option value="">거주지</option>
                                    <option value="전국">전국</option>
                                    <option value="서울">서울</option>
                                    <option value="경기도">경기도</option>
                                    <option value="강원도">강원도</option>
                                    <option value="충청북도">충청북도</option>
                                    <option value="충청남도">충청남도</option>
                                    <option value="전라북도">전라북도</option>
                                    <option value="전라남도">전라남도</option>
                                    <option value="경상북도">경상북도</option>
                                    <option value="경상남도">경상남도</option>
                                    <option value="제주도">제주도</option>
                                    <option value="인천">인천</option>
                                </select>
                                <select
                                    className={`w-1/5 p-4 border ${validationErrors.subjectGenderError ? 'border-warning' : 'border-grey'} rounded-lg flex-grow`}
                                    name="ballotSubjectGender"
                                    value={formData.ballotSubjectGender}
                                    onChange={handleChange}
                                >
                                    <option value="">성별</option>
                                    <option value="성별 무관">성별 무관</option>
                                    <option value="남성">남성</option>
                                    <option value="여성">여성</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>	
                <div className="flex-col">
                    <span className={`${validationErrors.detailDescriptionError ? 'text-warning' : 'text-grey'}`}>투표 상세 설명을 작성해주세요.</span>
                    <div className={`flex h-72 p-2 border ${validationErrors.detailDescriptionError ? 'border-warning' : 'border-grey'} rounded-lg`}>
                        <textarea 
                            className="flex-grow"
                            name="ballotDetailDescription"
                            value={formData.ballotDetailDescription}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>
            </div>
            <button className="px-8 py-4 rounded-lg bg-primary text-white" onClick={handleSubmit}>
                    작성하기
            </button>
        </div>
    )
}