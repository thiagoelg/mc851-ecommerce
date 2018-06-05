import axios from 'axios'
import ServerConfig from './ServerConfig'
import UserProfile from '../state/UserProfile'

const URL = ServerConfig.URL;

export const setCartClient = async (cartId, token) => {
    try {

        const response = await axios.post(`${URL}/cart/${cartId}`, {}, {
            headers: {
                "x-auth-token": token
            }
        });

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
};

export const getClientCartId = async () => {
    try {

        let token = await UserProfile.getToken();
        const response = await axios.get(`${URL}/cart`, {
            headers: {
                "x-auth-token": token
            }
        });

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
};

export const getCartById = async (cartId) => {
    try {

        let token = await UserProfile.getToken();
        const response = await axios.get(`${URL}/cart/${cartId}`, {
            headers: {
                "x-auth-token": token
            }
        });

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
};

export const createCart = async () => {
    try {

        let token = await UserProfile.getToken();
        const response = await axios.post(`${URL}/cart`, {}, {
            headers: {
                "x-auth-token": token
            }
        });

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
}

export const addProductToCart = async (cartId, productId, amount) => {
    try {

        let token = await UserProfile.getToken();
        const response = await axios.post(`${URL}/cart/${cartId}/book`, {
            productId: productId,
            amount: amount
        }, {
            headers: {
                "x-auth-token": token
            },
        });

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
}

export const removeProductFromCart = async (cartId, productId, amount) => {
    try {

        let token = await UserProfile.getToken();
        const response = await axios.post(`${URL}/cart/${cartId}/unbook`, {
            productId: productId,
            amount: amount
        }, {
            headers: {
                "x-auth-token": token
            },
        });

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
}


export default {
    setCartClient,
    getClientCartId,
    getCartById,
    createCart,
    addProductToCart,
    removeProductFromCart
}