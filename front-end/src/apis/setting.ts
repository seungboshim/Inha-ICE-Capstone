import axios from 'axios';

export const Server = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    timeout: 15000,
    // headers: {
    //     accept: 'application/json',
    //     'Content-Type': 'application/json'
    // }
});

export const FlaskServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_FLASK_URL,
    timeout: 3000,
})