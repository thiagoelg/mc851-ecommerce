import axios from 'axios'
import ServerConfig from './ServerConfig'
import UserProfile from "../state/UserProfile";

const URL = ServerConfig.URL;

export const PURCHASE_STATUS_LABEL = {
    1: "Pedido Realizado.",
    2: "Pagamento Aprovado.",
    3: "Aguardando Entrega.",
    6: "Pagamento Reprovado"
};

export const PURCHASE_STATUS = {
    ORDER_REQUESTED: 1,
    PAYMENT_APPROVED: 2,
    SEPARING_FROM_STOCK: 3,
    IN_TRANSPORT: 4,
    DELIVERED: 5,
    PAYMENT_REPROVED: 6
};

export const BOLETO_STATUS = {
    PENDING: "PENDING_PAYMENT",
    OK: "OK",
    EXPIRED: "EXPIRED",
    NOT_FOUND: "NOT_FOUND"
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