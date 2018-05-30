import axios from 'axios'

const ATENDIMENTO_URL = "https://centralatendimento-mc857.azurewebsites.net/";
const SITE_ID = "teste1";

export const ticketsByClient = async (clientId) => {
    try {
        const response = await axios.get(`${ATENDIMENTO_URL}/tickets/${SITE_ID}/${clientId}`)

        return {data : response.data, status: response.status}
    } catch (e) {
        if(e.response && e.response.status === 404) {
            return e.response;
        }
        console.log(e)
    }
};

export const ticketByClient = async (clientId, ticketId) => {
    try {
        const response = await axios.get(`${ATENDIMENTO_URL}/tickets/${SITE_ID}/${clientId}/ticket/${ticketId}`)
        
        return {data : response.data, status: response.status}
    } catch (e) {
        if(e.response && e.response.status === 404) {
            return e.response;
        }
        console.log(e)
    }
};

export const ticketByPurchase = async (clientId, purchaseId) => {
    try {
        const response = await axios.get(`${ATENDIMENTO_URL}/tickets/${SITE_ID}/${clientId}/compra/${purchaseId}`)
        
        return {data : response.data, status: response.status}
    } catch (e) {
        if(e.response && e.response.status === 404) {
            return e.response;
        }
        console.log(e)
    }
};

export const addTicket = async (clientId, ticket) => {
    try {
        const response = await axios.post(`${ATENDIMENTO_URL}/tickets/${SITE_ID}/${clientId}`, ticket)

        return {data : response.data, status: response.status}
    } catch (e) {
        if(e.response && e.response.status === 404) {
            return e.response;
        }
        console.log(e)
    }
};

export const addTicketByPurchase = async (clientId, ticket, purchaseId) => {
    try {
        const response = await axios.post(`${ATENDIMENTO_URL}/tickets/${SITE_ID}/${clientId}/compra/${purchaseId}`, ticket)
        
        return {data : response.data, status: response.status}
    } catch (e) {
        if(e.response && e.response.status === 404) {
            return e.response;
        }
        console.log(e)
    }
};

export const updateTicket = async (clientId, ticketId, ticket) => {
    try {
        const response = await axios.put(`${ATENDIMENTO_URL}/tickets/${SITE_ID}/${clientId}/ticket/${ticketId}`, ticket)
        
        return {data : response.data, status: response.status}
    } catch (e) {
        if(e.response && e.response.status === 404) {
            return e.response;
        }
        console.log(e)
    }
};

export const changeStatus = async (clientId, ticketId, message, statusId) => {
    try {
        const response = await axios.delete(`${ATENDIMENTO_URL}/tickets/${SITE_ID}/${clientId}/ticket/${ticketId}?code=${statusId}`, {
            data: message,
        });
        
        return {data : response.data, status: response.status}
    } catch (e) {
        if(e.response && e.response.status === 404) {
            return e.response;
        }
        console.log(e)
    }
};

export default {
    ticketsByClient,
    ticketByPurchase,
    ticketByClient,
    addTicket,
    addTicketByPurchase,
    updateTicket,
    changeStatus
}