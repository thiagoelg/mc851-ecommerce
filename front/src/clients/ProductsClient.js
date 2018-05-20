import axios from 'axios'
import ServerConfig from './ServerConfig'

const URL = ServerConfig.URL;

export const getProducts = async (params) => {
    try {

        const response = await axios.get(`${URL}/products`, {
            params
        });

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
};

export const getProductsByFullSearch = async (params) => {
    try {

        const response = await axios.get(`${URL}/products/search`, {
            params
        });

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
};

export const getCategories = async (params) => {
    try {

        const response = await axios.get(`${URL}/products/categories`, {
            params
        });

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
};


export const getProduct = async (params) => {
    try {

        const response = await axios.get(`${URL}/products/${params.id}`, {
            params
        });

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
};

export const getCategory = async (params) => {
    try {

        const response = await axios.get(`${URL}/products/categories/${params.id}`, {
            params
        });

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
};

export default {
    getProducts,
    getProductsByFullSearch,
    getCategories,
    getProduct,
    getCategory
}