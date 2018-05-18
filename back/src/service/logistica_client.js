import axios from 'axios'

const REQUEST_TIMEOUT = 30000
const LOGISTICA_URL = "https://hidden-basin-50728.herokuapp.com"

export const getShipment = async (params) => {

    try {
        const response = await axios.get(`${LOGISTICA_URL}/calculafrete`, {
            params
        })

        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export const getTracking = async (params, codRastreio) => {

    try {
        const response = await axios.get(`${LOGISTICA_URL}/rastrearentrega/${codRastreio}`, {
            params
        })

        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export const postShipment = async (info) => {

    try {
        const response = await axios.post(`${LOGISTICA_URL}/calculafrete`, info)

        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export default {
    getShipment,
    getTracking,
    postShipment,
}