import axios from 'axios'

const PRODUTOS_URL = "https://ftt-catalog.herokuapp.com";
const GROUP_ID = "b25534a4-a362-48f3-b9b4-944d80acafb2";
const DEFAULT_TIMEOUT = 30000

export const getProducts = async (params) => {

    try {
        const response = await axios.get(`${PRODUTOS_URL}/products/group/${GROUP_ID}`, {
            params
        });

        return {data: response.data, status: response.status}
    } catch (e) {
        //console.log(e)
    }
};

export const getProductsByFullSearch = async (params) => {

    try {
        const response = await axios.get(`${PRODUTOS_URL}/products/search/${params.search}`, {
            params
        });

        return {data: response.data, status: response.status}
    } catch (e) {
        console.error(e)
    }
};

export const getProduct = async (id) => {

    try {
        const response = await axios.get(`${PRODUTOS_URL}/products/${id}`);

        return {data: response.data, status: response.status}
    } catch (e) {
        //console.log(e)
    }
};

export const getCategories = async (params) => {

    try {
        const response = await axios.get(`${PRODUTOS_URL}/categories/group/${GROUP_ID}`, {
            params
        });

        return {data: response.data, status: response.status}
    } catch (e) {
        //console.log(e)
    }
};

export const getCategory = async (id) => {

    try {
        const response = await axios.get(`${PRODUTOS_URL}/categories/${id}`);

        return {data: response.data, status: response.status}
    } catch (e) {
        //console.log(e)
    }
};

export const reserveProduct = async (id, amount) => {

    try {
        const response = await axios.put(`${PRODUTOS_URL}/reservation/reserve/${id}`, `${amount}`, {
            timeout: DEFAULT_TIMEOUT,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return {data: response.data, status: response.status}
    } catch (e) {
        console.error(e)
    }
};

export const releaseProduct = async (id, amount) => {

    try {
        const response = await axios.put(`${PRODUTOS_URL}/reservation/release/${id}`, `${amount}`, {
            timeout: DEFAULT_TIMEOUT,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return {data: response.data, status: response.status}
    } catch (e) {
        console.error(e)
    }
};

export const persistProduct = async (product) => {

    try {
        const response = await axios.post(`${PRODUTOS_URL}/products`, product);

        return {data: response.headers.location, status: response.status}
    } catch (e) {
        console.error(e)
    }
};

export const persistCategory = async (category) => {

    try {
        const response = await axios.post(`${PRODUTOS_URL}/categories`, category);
        return {data: response.headers.location, status: response.status}
    } catch (e) {
        //console.log(e)
    }
};


export default {
    getProducts,
    getProductsByFullSearch,
    getProduct,
    getCategories,
    getCategory,
    reserveProduct,
    releaseProduct,
    persistProduct,
    persistCategory,
    GROUP_ID
}