import axios from 'axios'
import ServerConfig from './ServerConfig'
import UserProfile from '../state/UserProfile'

const URL = ServerConfig.URL;

const getClientToken = function() {
    let token = UserProfile.getToken();
    let header = {};
    if (token != null) {
        header = {
            headers: {
                "x-auth-token": token
            }
        }
    }
    return header;
}

export const initCart = async (cartId) => {
        
    // Create new cart
    if (cartId === 'null' || cartId === 'undefined') {
        let response = await createCart();
        if (response) {
            cartId = response.data.cartId;
        }
    }

    // Load products
    if (cartId) {
        let response = getCartById(cartId);
        return response;
    }
}

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

        const response = await axios.get(`${URL}/cart`, getClientToken());

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
};

export const getCartById = async (cartId) => {
    try {

        const response = await axios.get(`${URL}/cart/${cartId}`, getClientToken());

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
};

export const createCart = async () => {
    try {

        const response = await axios.post(`${URL}/cart`, {}, getClientToken());

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
}

export const addProductToCart = async (cartId, productId, amount) => {
    try {

        const response = await axios.post(`${URL}/cart/${cartId}/book`, {
            productId: productId,
            amount: amount
        }, getClientToken());

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
}

export const removeProductFromCart = async (cartId, productId, amount) => {
    try {

        const response = await axios.post(`${URL}/cart/${cartId}/unbook`, {
            productId: productId,
            amount: amount
        }, getClientToken());

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
}


export default {
    initCart,
    setCartClient,
    getClientCartId,
    getCartById,
    createCart,
    addProductToCart,
    removeProductFromCart
}