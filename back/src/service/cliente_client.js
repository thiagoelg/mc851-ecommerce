import axios from 'axios'

const REQUEST_TIMEOUT = 30000
const CLIENTE_URL = "http://us-central1-first-try-18f38.cloudfunctions.net/clientsAPI/"
const headers = {
    'api_key': 'abc'
}

export const register = async (params) => {

    try {
        const response = await axios.post(CLIENTE_URL + "/register", params, {
            headers
        })

        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const getClients = async () => {

    try {
        const response = await axios.get(CLIENTE_URL + "/clients", {
            headers
        })

        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const getClient = async (id) => {

    try {
        const response = await axios.get(`${CLIENTE_URL}/clients/${id}`, {
            headers
        })

        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const updateUser = async (id, params) => {

    try {
        const response = await axios.put(`${CLIENTE_URL}/update/${id}`, params, {
            headers
        })

        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const changePassword = async (id, params) => {

    try {
        const response = await axios.put(`${CLIENTE_URL}/changePass/${id}`, params, {
            headers
        })

        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const deleteUser = async (id) => {

    try {
        const response = await axios.delete(`${CLIENTE_URL}/delete/${id}`, {
            headers
        })

        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const login = async (params) => {

    try {
        const response = await axios.get(`${CLIENTE_URL}/login}`, {
            headers,
            data: params
        })

        return response.data
    } catch (e) {
        console.log(e)
    }
}

export default {
    register,
    getClients,
    getClient,
    updateUser,
    changePassword,
    deleteUser,
    login
}