import ClientClient from "../service/cliente_client"

export const register = async (params) => {

    const response = await ClientClient.register(params);

    if (!response || (response.status >= 500 && response.status <= 599)) {
        console.error("register error - status: " + response.status);
        return;
    }

    return response.data;
};

export const login = async (params) => {

    const response = await ClientClient.login(params);

    if (!response || (response.status >= 500 && response.status <= 599)) {
        console.error("login error - status: " + response.status);
        return;
    }

    return response.data;
};

export default {
    register,
    login
};