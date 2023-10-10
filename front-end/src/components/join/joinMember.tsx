import React, { useState } from "react"
import { Server } from "@/apis/setting"
import { useRouter } from "next/navigation";

export default function JoinMember() {
    const router = useRouter();

    const [formData, setFormData] = useState({   
        memberEmail: "",
        memberName: "",
        memberNickName: "",
        memberPassword: "",
        memberBirthDate: "",
        memberGender: "",
        memberRegion: "",
        confirmPassword: "",
    })

    const [validationErrors, setValidationErrors] = useState({
        nameError: false,
        nicknameError: false,
        emailError: false,
        passwordError: false,
        confirmPasswordError: false,
        birthDateError: false,
        genderError: false,
        regionError: false,
    });

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // 이름 입력창이 비어있지 않으면 isNameValid === true
        const isNameValid = formData.memberName.trim() !== "";

        // 닉네임이 2자에서 5자 사이면 isNicknameValid === true
        const isNicknameValid =
        formData.memberNickName.trim().length >= 2 &&
        formData.memberNickName.trim().length <= 5;

        // 이메일, 비밀번호 유효성 검사에 사용할 정규식 패턴
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

        // 이메일, 비밀번호의 형식이 정규식 패턴에 맞으면 true
        const isEmailValid = emailRegex.test(formData.memberEmail.trim());
        const isPasswordValid = passwordRegex.test(formData.memberPassword.trim());

        // 비밀번호가 형식에 맞으며 비밀번호와 비밀번호 확인을 동일하게 입력하면 true
        const isConfirmPasswordValid =
            isPasswordValid && formData.memberPassword === formData.confirmPassword;

        const isBirthDateValid = formData.memberBirthDate.trim() !== "";

        const isGenderValid = formData.memberGender.trim() !== "";

        const isRegionValid = formData.memberRegion.trim() !== "";

        setValidationErrors({
            nameError: !isNameValid,
            nicknameError : !isNicknameValid,
            emailError : !isEmailValid ,
            passwordError : !isPasswordValid ,
            confirmPasswordError : !isConfirmPasswordValid,
            birthDateError : !isBirthDateValid,
            genderError : !isGenderValid,
            regionError : !isRegionValid,
        });

        // 보낼 formData에서 비번확인 제거
        const { confirmPassword, ...dataToSend } = formData;

        try {
            const response = await Server.post('/members', dataToSend);
            console.log(response.data);  // 응답 데이터 확인

            // TODO : 회원가입 성공 후 처리할 로직 작성
            router.push('/')

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col justify-center mt-12">
            <div className="flex flex-col">
                <span className="my-4">이메일을 입력해주세요.</span>
                <input 
                    className={`p-4 border ${validationErrors.emailError ? 'border-warning' : 'border-grey'} rounded-xl flex-grow`}
                    type="email"
                    name="memberEmail"
                    value={formData.memberEmail}
                    onChange={handleChange}
                />
                {validationErrors.emailError && (
                    <span className="text-warning">유효한 이메일 형식으로 입력해주세요.</span>
                )}
            </div>
            <div className="flex flex-col">
                <span className="my-4">비밀번호를 입력해주세요.</span>
                <input 
                    className={`p-4 border ${validationErrors.passwordError ? 'border-warning' : 'border-grey'} rounded-xl flex-grow`}
                    type="password"
                    name="memberPassword"
                    value={formData.memberPassword}
                    onChange={handleChange}
                />
                {validationErrors.passwordError && (
                    <span className="text-warning">비밀번호는 최소 8자리이며, 알파벳, 숫자가 포함되어야 합니다.</span>
                )}
            </div>
            <div className="flex flex-col">
                <span className="my-4">비밀번호를 한번 더 입력해주세요.</span>
                <input 
                    className={`p-4 border ${validationErrors.confirmPasswordError ? 'border-warning' : 'border-grey'} rounded-xl flex-grow`}
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                {validationErrors.confirmPasswordError && (
                    <span className="text-warning">비밀번호가 다릅니다.</span>
                )}
            </div>
            <div className="flex flex-col">
                <span className="my-4">이름을 입력해주세요.</span>
                <input 
                    className={`p-4 border ${validationErrors.nameError ? 'border-warning' : 'border-grey'} rounded-xl flex-grow`}
                    type="text"
                    name="memberName"
                    value={formData.memberName}
                    onChange={handleChange}
                />
                {validationErrors.nameError && (
                    <span className="text-warning">이름은 필수 입력사항입니다.</span>
                )}
            </div>
            <div className="flex flex-col">
                <span className="my-4">닉네임을 입력해주세요.</span>
                <input 
                    className={`p-4 border ${validationErrors.nicknameError ? 'border-warning' : 'border-grey'} rounded-xl flex-grow`}
                    type="text"
                    name="memberNickName"
                    value={formData.memberNickName}
                    onChange={handleChange}
                />
                {validationErrors.nicknameError && (
                    <span className="text-warning">2자에서 5자 사이의 닉네임을 입력해주세요.</span>
                )}
            </div>
            <div className="flex flex-col">
                <span className="my-4">생년월일을 입력해주세요.</span>
                <input 
                    className={`p-4 border ${validationErrors.birthDateError ? 'border-warning' : 'border-grey'} rounded-xl flex-grow`}
                    type="date"
                    name="memberBirthDate"
                    value={formData.memberBirthDate}
                    onChange={handleChange}
                />
                {validationErrors.birthDateError && (
                    <span className="text-warning">생년월일을 입력해주세요.</span>
                )}            
            </div>
            <div className="flex flex-col">
                <span className="my-4">성별을 입력해주세요.</span>
                <select 
                    className={`p-4 border ${validationErrors.genderError ? 'border-warning' : 'border-grey'} rounded-xl flex-grow`}
                    name="memberGender"
                    value={formData.memberGender}
                    onChange={handleChange}
                >
                    <option value="">선택하세요</option>
                    <option value="남성">남성</option>
                    <option value="여성">여성</option>
                </select>
                {validationErrors.genderError && (
                    <span className="text-warning">성별을 선택해주세요.</span>
                )}
            </div>
            <div className="flex flex-col">
                <span className="my-4">사는 곳을 입력해주세요.</span>
                <select
                    className={`p-4 border ${validationErrors.regionError ? 'border-warning' : 'border-grey'} rounded-xl flex-grow`}
                    name="memberRegion"
                    value={formData.memberRegion}
                    onChange={handleChange}
                >
                    <option value="">선택하세요</option>
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
                {validationErrors.regionError && (
                    <span className="text-warning">사는 곳을 선택해주세요.</span>
                )}
            </div>
            <div className="flex justify-center my-4">
                <button 
                    // disabled={
                    //     validationErrors.nameError ||
                    //     validationErrors.nicknameError ||
                    //     validationErrors.emailError ||
                    //     validationErrors.passwordError ||
                    //     validationErrors.confirmPasswordError
                    // }
                    className={`px-8 py-4 rounded-lg ${
                        !formData.memberEmail &&
                        !validationErrors.nicknameError &&
                        !validationErrors.emailError &&
                        !validationErrors.passwordError &&
                        !validationErrors.confirmPasswordError ? 'bg-primary text-white' : 'bg-primary opacity-50 text-white'
                    }`}
                    onClick={handleSubmit}
                >
                    가입하기
                </button>
            </div>
        </div>
    )
}