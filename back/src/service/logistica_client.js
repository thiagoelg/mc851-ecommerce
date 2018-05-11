import axios from 'axios'

const REQUEST_TIMEOUT = 30000
const LOGISTICA_URL = "https://hidden-basin-50728.herokuapp.com"

export const getShipping = async (params) => {

    try {
        const response = await axios.get(`${LOGISTICA_URL}/calculafrete`, {
            params
        })

        return response.data
    } catch (e) {
        console.log(e)
    }
}

export default {
    getShipping,
}