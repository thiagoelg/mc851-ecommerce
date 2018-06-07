import axios from 'axios'
import ServerConfig from './ServerConfig'

const URL = ServerConfig.URL;

export const getCreditCardInstallments = async (params) => {

    return await axios.post(`${URL}/payment/creditCard/installments`, params);

};