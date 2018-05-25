import axios from 'axios'
import ServerConfig from './ServerConfig'

const URL = ServerConfig.URL;

export const getStates = async () => {
    return await axios.get(`${URL}/address/states`,);
};

export const getCities = async (uf) => {
    return await axios.get(`${URL}/address/states/${uf}/cities`,);
};

export const getCep = async (cep) => {
    return await axios.get(`${URL}/address/cep/${cep}`,);
};

export default {
    getStates,
    getCities,
    getCep
}