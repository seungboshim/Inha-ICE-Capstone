import axios from 'axios';
import { Server } from './setting';
import { Cookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

export interface loginProps {
    memberEmail: String | undefined,
    memberPassword: String | undefined
}

export interface RefreshReturnType {
    success: boolean;
    access_token: string;
    refresh_token: string;
}

export const getAccessRefreshToken = async ({memberEmail, memberPassword}: loginProps) => {
    const postData = {
        memberEmail,
        memberPassword
    };

    try {
        const response = await Server.post('/login', postData);
        
        console.log('요청이 성공했습니다.', response.data);
        localStorage.setItem('access', response.data.accessToken);
        localStorage.setItem('refresh', response.data.refreshToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('access')}`
      
        // 로그인에 성공했다는 신호로 true 반환
        return true;
    } catch (error: any) {
        // 요청이 실패하면 이곳에서 처리합니다.
        console.error('요청이 실패했습니다.', error.response.data.message);
        alert(error.response.data.message);

        // 로그인에 실패했다는 신호로 false 반환
        return false;
    }

    // await Server.post('/login', postData)
    // .then(response => {
    //     // 요청이 성공하면 이곳에서 처리합니다.
    //     console.log('요청이 성공했습니다.', response.data);
    //     localStorage.setItem('access', response.data.accessToken);
    //     localStorage.setItem('refresh', response.data.refreshToken);
    //     axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('access')}`
    //     return true;
    // })
    // .catch(error => {
    //     // 요청이 실패하면 이곳에서 처리합니다.
    //     console.error('요청이 실패했습니다.', error.response.data.message);
    //     alert(error.response.data.message);
    // });
};

Server.interceptors.request.use((config) => {
    const token = localStorage.getItem('access');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    //console.log(token);
    return config;
});

export const logout = async () => {
    const refreshToken = localStorage.getItem('refresh');
    try {
        localStorage.clear();
    } catch (error) {
        console.log('로그아웃 에러:', error)
    }
};

/** accessToken 값 가져오기 */
export const getAccessToken = () => {
    return localStorage.getItem('access');
};

// // 만료된 액세스 토큰 갱신
// export const getRefresh = async () => {
//     const accessToken = localStorage.getItem('access');
//     const refreshToken = localStorage.getItem('refresh');
//     const headers = { Authorization: `Bearer ${accessToken}` };
//     // TODO: return 값으로 받아온 access token 으로 재요청
//     try {
//         return await Server.post<RefreshReturnType>(
//             '/auth/refresh',
//             { refresh_token: refreshToken },
//             { headers }
//         );
//     } catch (error) {
//         console.log('액세스 토큰 갱신 실패: ', error);
//     }
// };



export const deleteAccount = async () => {
    try {
        const uid = localStorage.getItem('uid');
        await Server.delete(`/mypage/user/delete/${uid}`);
        localStorage.clear();
    } catch (error) {
        console.log('회원탈퇴 에러:', error);
    }
};

export const editInformation = async (
    profileImg: string,
    nationality: string
) => {
    try {
        const uid = localStorage.getItem('uid');
        await Server.put(`/mypage/user/info/${uid}`, {
            profileImg,
            nationality
        }).then(() => alert('수정이 완료되었습니다.'));
    } catch (error: any) {
        console.log('회원정보 수정 에러:', error);
        alert('네트연결에 실패하였습니다.');
    }
};

export const completeSignup = async (nickname: string) => {
    try {
        const user_index = localStorage.getItem('uid');
        const result = await Server.post('/auth/nickname', {
            user_index,
            nickname
        });
        return result.data;
    } catch (error) {
        console.log('회원가입 실패: ', error);
    }
};
