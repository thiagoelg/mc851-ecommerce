import LogisticClient from '../service/logistica_client'

export const getShipment = async (params) => {

    const response = await LogisticClient.getShipment(params)

    if (!response || response.status != 200) {
        console.error("getShipment error - status: " + response.status)
        return 0
    }

    return response.data
}

export const getTracking = async (params, codRastreio) => {

    const response = await LogisticClient.getTracking(params, codRastreio)

    if (!response || response.status != 200) {
        console.error("getTracking error - status: " + response.status)
        return []
    }

    return response.data
}

export const postShipment = async (info) => {

    const response = await LogisticClient.postShipment(info)

    if (!response || response.status != 200) {
        console.error("postShipment error - status: " + response.status)
        return {}
    }

    return response.data
}

export default {
    getShipment,
    getTracking,
    postShipment,
}