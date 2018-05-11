import axios from 'axios'

const REQUEST_TIMEOUT = 30000
const URL = "http://node.thiagoelg.com"
var headers = {"x-api-key": "717423f2-73ff-4bc1-a00f-f1d593c81fca"}

export const getCEP = async (cep) => {
    try {
        const response = await axios.get(URL + `/paises/br/cep/${cep}`, {
            headers,
        })
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const isCepValid = async (cep) => {
    try {
        const response = await axios.get(URL + `/paises/br/cep/${cep}`,{
            headers,
        })
        console.log(response) // TODO: return responde.status == 200
    } catch (error) {
        console.error(error)
    }
}

export const getCities = async (uf, params) => {
    try {
        const response = await axios.get(URL + `/paises/br/${uf}/cidades`, {
            headers,
            params,
        })
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getStates = async () => {
    try {
        const response = await axios.get(URL + `/paises/br/estados`, {
            headers,
        })
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export default {
    getCEP,
    isCepValid,
    getCities,
    getStates,
}