import axios from 'axios'

const REQUEST_TIMEOUT = 30000
const PRODUTOS_URL = "https://ftt-catalog.herokuapp.com"

export const getProducts = async (params) => {

    try {
        const response = await axios.get(`${PRODUTOS_URL}/products`, {
            params
        })

        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const getProduct = async (id) => {

    try {
        const response = await axios.get(`${PRODUTOS_URL}/products/${id}`)

        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const getCategories = async (params) => {

    try {
        const response = await axios.get(`${PRODUTOS_URL}/categories`, {
            params
        })

        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const getCategory = async (id) => {

    try {
        const response = await axios.get(`${PRODUTOS_URL}/categories/${id}`)

        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const reserveProduct = async (id, amount) => {

    try {
        const response = await axios.get(`${PRODUTOS_URL}/${id}:reserve`, {
            params: {
                id: id
            },
            data: amount
        })

        if (response.status === 204)
            return true
        return false
    } catch (e) {
        console.log(e)
    }
}

export const releaseProduct = async (id, amount) => {

    try {
        const response = await axios.get(`${PRODUTOS_URL}/${id}:release`, {
            params: {
                id: id
            },
            data: amount
        })

        if (response.status === 204)
            return true
        return false
    } catch (e) {
        console.log(e)
    }
}


export default {
    getProducts,
    getProduct,
    getCategories,
    getCategory,
    reserveProduct,
    releaseProduct
}