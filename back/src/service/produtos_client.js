import axios from 'axios'

const REQUEST_TIMEOUT = 30000
const PRODUTOS_URL = "https://ftt-catalog.herokuapp.com"

export const getProducts = async (params) => {

    try {
        const response = await axios.get(PRODUTOS_URL + "/products", {
            params
        })

        return response.data
    } catch (e) {
        console.log(e)
    }
}

export default {
    getProducts
}