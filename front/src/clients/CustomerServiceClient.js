import axios from 'axios'
import ServerConfig from './ServerConfig'
import UserProfile from '../state/UserProfile'

const URL = ServerConfig.URL;

export const TICKET_STATUS_LABELS = {
    0: "Aberto",
    1: "Fechado",
    2: "Cancelado"
};

export const TICKET_STATUS = {
    OPEN: 0,
    CLOSED: 1,
    CANCELED: 2
};

export const getClientTickets = async () => {
    return await axios.get(`${URL}/sac/tickets`, {
        headers: {
            "x-auth-token": UserProfile.getToken()
        }
    });
};

export const getTicket = async (ticketId) => {
    return await axios.get(`${URL}/sac/tickets/${ticketId}`, {
        headers: {
            "x-auth-token": UserProfile.getToken()
        }
    });
};

export const registerTicket = async (message) => {
    return await axios.post(`${URL}/sac/tickets`, message, {
        headers: {
            "x-auth-token": UserProfile.getToken()
        }
    });
};

export const updateTicket = async (ticketId, message) => {
    return await axios.put(`${URL}/sac/tickets/${ticketId}`, message, {
        headers: {
            "x-auth-token": UserProfile.getToken()
        }
    });
};

export const changeTicketStatus = async (ticketId, statusId, message) => {
    return await axios.delete(`${URL}/sac/tickets/${ticketId}?statusId=${statusId}`, {
        headers: {
            "x-auth-token": UserProfile.getToken()
        },
        data: message
    });
};

export const getPurchaseTickets = async (purchaseId) => {
    return await axios.get(`${URL}/sac/tickets/purchase/${purchaseId}`, {
        headers: {
            "x-auth-token": UserProfile.getToken()
        }
    });
};

export const registerPurchaseTicket = async (purchaseId, message) => {
    return await axios.post(`${URL}/sac/tickets/purchase/${purchaseId}`, message, {
        headers: {
            "x-auth-token": UserProfile.getToken()
        }
    });
};
