import LogisticClient from '../service/logistica_client'

export const getShipments = async (params) => {

    const response = await LogisticClient.getShipments(params)

    if (!response) {
        console.error("getShipments Error");
        return {
            status: 400
        }
    }

    else if(response.status !== 200) {
        console.error("getShipments Error with status " + response.status);
        return {
            status: response.status,
            data: response.data
        };
    }

    return {
        status: 200,
        data: response.data
    }
}

export const getTracking = async (codRastreio) => {

    const response = await LogisticClient.getTracking(codRastreio)

    if (!response) {
        console.error("getTracking Error");
        return {
            status: 500
        }
    }
    else if(response.status !== 200) {
        console.error("getTracking Error with status " + response.status);
        return {
            status: response.status,
            data: response.data
        };
    }

    return response.data
}

export const postShipment = async (info) => {

    const response = await LogisticClient.postShipment(info)

    if (!response) {
        console.error("postShipment Error");
        return {
            status: 500
        }
    }
    else if(response.status !== 200) {
        console.error("postShipment Error with status " + response.status);
        return {
            status: response.status,
            data: response.data
        };
    }

    return response.data
}

export default {
    getShipments,
    getTracking,
    postShipment,
}