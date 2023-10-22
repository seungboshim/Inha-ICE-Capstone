import React, { useState, useEffect, useRef } from "react";
import Modal from "./modal";
import { getBallotData } from "@/apis/ballots";
import { Candidate } from "@/apis/types";
import { Server } from "@/apis/setting";

export default function AdminCandidatesModal({ setIsModal, ballotId }: any) {
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    const [formData, setFormData] = useState({
        ballotId: ballotId,
        candidateName: ""
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
    
    const isNameValid = formData.candidateName.trim() !== "";

    const handleSubmit = async (e: any) => {
        e.preventDefault();


        if (isNameValid) {
            const dataToSend = new FormData();
            const formDataString = JSON.stringify(formData);
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

            try {
                const response = await Server.post('/admins/voting/candidates', dataToSend);
                console.log(response.data);  // 응답 데이터 확인
    
                // TODO : 후보자 작성 후 모달창 닫기?
            } catch (error: any) {
                console.error(error);
                alert(error.response.data.message);
            }
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

    const renderContent = () => {
        <div>
            <div>
            <span className={`${!isNameValid ? 'text-warning' : 'text-grey'} mb-2`}>제목을 입력해주세요.</span>
                    <div className={`flex flex-grow p-2 border ${!isNameValid ? 'border-warning' : 'border-grey'} rounded-lg`}>
                        <input 
                            className="flex-grow"
                            type="text"
                            name="ballotName"
                            value={formData.candidateName}
                            onChange={handleChange}
                        ></input>
                    </div>
            </div>
        </div>
    }

    return (
        <Modal
            modalMode={0}
            title={`후보자를 추가해주세요.`}
            setModalState={setIsModal}
            onClickCompleteButton={() => setIsModal(false)}
            completeText=''
        >
            <div className='p-5'>
                {renderContent()}
            </div>
        </Modal>
    )
}