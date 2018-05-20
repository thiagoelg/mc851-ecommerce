import axios from 'axios'

const PRODUTOS_URL = "https://ftt-catalog.herokuapp.com";
const GROUP_ID = "981ab11e-74c3-4226-b867-c8172ee6f503";

export const getProducts = async (params) => {

    try {
        const response = await axios.get(`${PRODUTOS_URL}/products/group/${GROUP_ID}`, {
            params
        })

        return {data: response.data, status: response.status}
    } catch (e) {
        console.error(e)
    }
}

export const getProduct = async (id) => {

    try {
        const response = await axios.get(`${PRODUTOS_URL}/products/${id}`)

        return {data: response.data, status: response.status}
    } catch (e) {
        console.error(e)
    }
}

export const getCategories = async (params) => {

    try {
        const response = await axios.get(`${PRODUTOS_URL}/categories/group/${GROUP_ID}`, {
            params
        })

        return {data: response.data, status: response.status}
    } catch (e) {
        console.error(e)
    }
}

export const getCategory = async (id) => {

    try {
        const response = await axios.get(`${PRODUTOS_URL}/categories/${id}`)

        return {data: response.data, status: response.status}
    } catch (e) {
        console.error(e)
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

        return {data: response.data, status: response.status}
    } catch (e) {
        console.error(e)
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

        return {data: response.data, status: response.status}
    } catch (e) {
        console.error(e)
    }
}

export const persistProduct = async (product) => {

    try {
        const response = await axios.post(`${PRODUTOS_URL}/products`, product);

        return {data: response.headers.location, status: response.status}
    } catch (e) {
        console.error(e)
    }
}

export const persistCategory = async (category) => {

    try {
        const response = await axios.post(`${PRODUTOS_URL}/categories`, category);
        return {data: response.headers.location, status: response.status}
    } catch (e) {
        console.error(e)
    }
}


export default {
    getProducts,
    getProduct,
    getCategories,
    getCategory,
    reserveProduct,
    releaseProduct,
    persistProduct,
    persistCategory,
    GROUP_ID
}