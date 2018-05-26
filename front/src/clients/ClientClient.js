import axios from 'axios'
import ServerConfig from './ServerConfig'

const URL = ServerConfig.URL;

export const register = async (params) => {

    return await axios.post(`${URL}/user`, params);

};

export const login = async (params) => {

    return await axios.post(`${URL}/user/login`, params);

};

export const getClient = async (token) => {

    return await axios.get(`${URL}/user`, {
        headers: {
            "x-auth-token": token
        }
    });

};

export const updateClient = async (token, data) => {

    return await axios.put(`${URL}/user/update`, data, {
        headers: {
            "x-auth-token": token
        }
    });

};

export const changePassword = async (token, data) => {

    return await axios.put(`${URL}/user/changepassword`, data, {
        headers: {
            "x-auth-token": token
        }
    });

};