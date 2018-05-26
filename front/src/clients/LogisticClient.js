import axios from 'axios'
import ServerConfig from './ServerConfig'

const URL = ServerConfig.URL;

export const getShippingOptions = async (params) => {
    try {

        const response = await axios.get(`${URL}/logistic/shipping`, {
            params
        });

        return {data: response.data, status: response.status};

    } catch (e) {
        console.error(e);
    }
};