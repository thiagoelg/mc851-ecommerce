import axios from 'axios'

const REQUEST_TIMEOUT = 30000
const CREDITO_URL = "https://glacial-brook-98386.herokuapp.com"
const headers = {"x-api-key": "tmvcgve"}

export const getScore = async (cpf) => {
    try {
        const response = await axios.get(`${CREDITO_URL}/score/${cpf}`, {
            headers
        })
        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export const addPayment = async (cpf, payment) => {
    try {
        const response = await axios.post(`${CREDITO_URL}/payment/${cpf}`, payment, {
            headers
        })
        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export default {
    getScore,
    addPayment
}