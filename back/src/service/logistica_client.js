import axios from 'axios'

const REQUEST_TIMEOUT = 30000
const LOGISTICA_URL = "https://hidden-basin-50728.herokuapp.com";
const API_KEY = "1d9e536e-44cd-56e3-838c-a9622a812ab4"

export const SHIPPING_TYPE = {
    PAC: "PAC",
    SEDEX: "SEDEX"
};

export const PACKET_TYPE = {
    BOX: "Caixa",
    ENVELOPE: "envelope"
};

export const getShipments = async (params) => {

    try {
        const response = await axios.get(`${LOGISTICA_URL}/calculatodosfretes`, {
            params
        });

        return {data : response.data, status: response.status}
    } catch (e) {
        const response = e.response;
        return {data : response.data, status: response.status}
    }
};

export const getTracking = async (codRastreio) => {

    try {
        const response = await axios.get(`${LOGISTICA_URL}/rastrearentrega/${codRastreio}`, {
            params: {
                apiKey: API_KEY
            }
        });

        return {data : response.data, status: response.status}
    } catch (e) {
        //console.log(e)
    }
};

export const postShipment = async (info) => {

    try {
        info.apiKey = API_KEY
        const response = await axios.post(`${LOGISTICA_URL}/cadastrarentrega`, info)

        return {data : response.data, status: response.status}
    } catch (e) {
        //console.log(e)
    }
};

export default {
    getShipments,
    getTracking,
    postShipment,
    SHIPPING_TYPE,
    PACKET_TYPE
}
