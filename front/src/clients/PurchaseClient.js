import axios from 'axios'
import ServerConfig from './ServerConfig'
import UserProfile from "../state/UserProfile";

const URL = ServerConfig.URL;

export const PURCHASE_STATUS_LABEL = {
    1: "Pedido Realizado.",
    2: "Pagamento Aprovado.",
    3: "Em Separação de Estoque.",
    4: "Em Transporte.",
    5: "Entregue.",
};

export const getPurchases = async () => {
    return await axios.get(`${URL}/purchase`, {
        headers: UserProfile.getAuthHeader()
    });
};

export const getPurchase = async (purchaseId) => {
    return await axios.get(`${URL}/purchase/${purchaseId}`, {
        headers: UserProfile.getAuthHeader()
    });
};

export const getPurchaseTracking = async (purchaseId) => {
    return await axios.get(`${URL}/purchase/${purchaseId}/tracking`, {
        headers: UserProfile.getAuthHeader()
    });
};