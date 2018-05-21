import axios from 'axios'
import ServerConfig from './ServerConfig'

const URL = ServerConfig.URL;

export const register = async (params) => {
    try {

        const response = await axios.post(`${URL}/user`, {
            params
        });

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
};

export const login = async (params) => {
    try {

        const response = await axios.post(`${URL}/user/login`, {
            params
        });

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
};