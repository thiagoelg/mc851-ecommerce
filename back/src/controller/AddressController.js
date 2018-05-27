import AddressClient from '../service/endereco_client'

export const getStates = async () => {

    const response = await AddressClient.getStates();

    if (!response || response.status !== 200) {
        console.error("getStates error - status: " + response.status);
        return {
            status: 500
        }
    }

    return {
        status: response.status,
        data: response.data
    }
};

export const getCities = async (uf) => {

    const response = await AddressClient.getCities(uf);

    if (!response || response.status !== 200) {
        console.error("getCities error - status: " + response.status);
        return {
            status: 500
        }
    }

    return {
        status: response.status,
        data: response.data
    }
};

export const getCep = async (cep) => {

    const response = await AddressClient.getCEP(cep);

    if (!response || response.status !== 200) {
        console.error("getCEP error - status: " + response.status);
        return {
            status: 500
        }
    }

    return {
        status: response.status,
        data: response.data
    }
};

export default {
    getStates,
    getCities,
    getCep
}
