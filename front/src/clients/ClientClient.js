import axios from 'axios'
import ServerConfig from './ServerConfig'

const URL = ServerConfig.URL;

export const register = async (params) => {
    try {

        return await axios.post(`${URL}/user`, params);

    } catch (e) {
        return {status: 400};
    }
};

export const login = async (params) => {
    try {

        return await axios.post(`${URL}/user/login`, params);

    } catch (e) {
        console.error(e);
    }
};

export const getClient = async (params) => {
    try {

        const response = await axios.get(`${URL}/user/${params}`);

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
};