import axios from 'axios'

const REQUEST_TIMEOUT = 30000
const PRODUTOS_URL = "https://hidden-basin-50728.herokuapp.com"

export const getShipping = (params) => {

    return axios.get(PRODUTOS_URL + "/calculafrete", {
        params
    }).then(response => {
        return response.data
    }).catch(error => {
        console.error(error)
    })
}

export default {
    getShipping,
}