import { useRecoilState } from "recoil";
import { isAdminState } from "../atoms/LoginAtom";
import { useEffect } from "react";
import { getAccessToken } from "@/apis/login";
import base64, { decode } from "js-base64"

/** accessToken 받아서 회원 status 저장하는 커스텀훅 */
export function useHandleToken(setIsAdmin: any) {
    //const [isAdmin, setIsAdmin] = useRecoilState(isAdminState);

    useEffect(() => {
        const token = getAccessToken();

        if (token) {
            const payload = token.split('.')[1];
            const decodedPayload = decode(payload);
            const payloadObject = JSON.parse(decodedPayload);

            // admin 이면 adminStatus == true
            const adminStatus = payloadObject.authorities === "ROLE_ADMIN";
            // 그 정보를 isAdmin에 저장
            setIsAdmin(adminStatus);
        }
    }, [setIsAdmin])
}