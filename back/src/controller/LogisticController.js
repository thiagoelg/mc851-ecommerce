import LogisticClient from '../service/logistica_client'

export const getShipments = async (params) => {

    const response = await LogisticClient.getShipments(params)

    if (!response || response.status != 200) {
        console.error("getShipments error - status: " + response.status)
        return 0
    }

    return response.data
}

export const getTracking = async (codRastreio) => {

    const response = await LogisticClient.getTracking(codRastreio)

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
    getShipments,
    getTracking,
    postShipment,
}