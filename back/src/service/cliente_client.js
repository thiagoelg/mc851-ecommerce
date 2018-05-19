import axios from 'axios'

const REQUEST_TIMEOUT = 30000
const CLIENTE_URL = "http://us-central1-first-try-18f38.cloudfunctions.net/clientsAPI"
const headers = {
    'api_key': 'abc'
}

export const register = async (info) => {

    try {
        const response = await axios.post(CLIENTE_URL + "/register", info, {
            headers
        })

        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export const getClients = async () => {

    try {
        const response = await axios.get(CLIENTE_URL + "/clients", {
            headers
        })

        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export const getClient = async (id) => {

    try {
        const response = await axios.get(`${CLIENTE_URL}/clients/${id}`, {
            headers
        })

        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export const updateUser = async (id, info) => {

    try {
        const response = await axios.put(`${CLIENTE_URL}/update/${id}`, info, {
            headers
        })

        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export const changePassword = async (id, info) => {

    try {
        const response = await axios.put(`${CLIENTE_URL}/changePass/${id}`, info, {
            headers
        })

        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export const deleteUser = async (id) => {

    try {
        const response = await axios.delete(`${CLIENTE_URL}/delete/${id}`, {
            headers
        })

        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export const login = async (params) => {
    
    // Concatenate params to headers
    Object.assign(headers, params)

    try {
        const response = await axios.get(`${CLIENTE_URL}/login}`, {
            headers,
        })

        return {data : response.data, status: response.status}
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