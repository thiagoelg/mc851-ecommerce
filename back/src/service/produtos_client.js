import axios from 'axios'

const REQUEST_TIMEOUT = 30000
const PRODUTOS_URL = "https://ftt-catalog.herokuapp.com"

export const getProducts = (params) => {

    return axios.get(PRODUTOS_URL + "/products", {
        params
    }).then(response => {
        return response.data
    }).catch(error => {
        console.error(error)
    })
}

export const getCategories = (params) => {

    return axios.get(PRODUTOS_URL + "/categories", {
        params
    }).then(response => {
        return response.data
    }).catch(error => {
        console.error(error)
    })
}

export default {
    getProducts,
    getCategories,
}