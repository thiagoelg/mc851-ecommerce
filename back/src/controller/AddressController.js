import AddressClient from '../service/endereco_client'

export const getStates = async () => {

    const response = await AddressClient.getStates();

    if (!response) {
        console.error("getStates Error");
        return {}
    }
    else if(response.status !== 200) {
        console.error("getStates Error with status " + response.status);
        return {
            status: response.status,
            data: response.data
        }
    }

    return {
        status: response.status,
        data: response.data
    }
};

export const getCities = async (uf) => {

    const response = await AddressClient.getCities(uf);

    if (!response) {
        console.error("getCities Error");
        return {}
    }
    else if(response.status !== 200) {
        console.error("getCities Error with status " + response.status);
        return {
            status: response.status,
            data: response.data
        }
    }

    return {
        status: response.status,
        data: response.data
    }
};

export const getCep = async (cep) => {

    const response = await AddressClient.getCEP(cep);

    if (!response) {
        console.error("getCep Error");
        return {}
    }
    else if(response.status !== 200) {
        console.error("getCep Error with status " + response.status);
        return {
            status: response.status,
            data: response.data
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
