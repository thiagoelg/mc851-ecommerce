import axios from 'axios'
import ServerConfig from './ServerConfig'
import UserProfile from "../state/UserProfile";

const URL = ServerConfig.URL;

export const createCart = async () => {
    return await axios.post(`${URL}/cart`, {}, {
        headers: UserProfile.getAuthHeader()
    });
};

export const book = async (cartId, cartProduct) => {
    return await axios.post(`${URL}/cart/${cartId}/book`, cartProduct, {
        headers: UserProfile.getAuthHeader()
    });
};

export const unbook = async (cartId, cartProduct) => {
    return await axios.post(`${URL}/cart/${cartId}/unbook`, cartProduct, {
        headers: UserProfile.getAuthHeader()
    });
};

export const getCartById = async (cartId) => {
    return await axios.get(`${URL}/cart/${cartId}`, {
        headers: UserProfile.getAuthHeader()
    });
};

export const associateCartToClient = async (cartId) => {
    return await axios.post(`${URL}/cart/${cartId}`, {}, {
        headers: UserProfile.getAuthHeader()
    });
};

export const getClientCartId = async () => {
    return await axios.get(`${URL}/cart`, {
        headers: UserProfile.getAuthHeader()
    });
};

export const checkout = async (cartId, params) => {
    return await axios.post(`${URL}/cart/${cartId}/checkout`, params, {
        headers: UserProfile.getAuthHeader()
    });
};