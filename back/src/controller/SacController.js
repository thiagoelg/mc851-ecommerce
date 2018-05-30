import SacClient from '../service/sac_client'
import AuthTokenGenerator from '../utils/AuthTokenGenerator'

export const ticketsByClient = async (token) => {
    const user = AuthTokenGenerator.verify(token);
    if(!user) {
        return {
            status: 403
        }
    }

    const response = await SacClient.ticketsByClient(user.cid);

    if (!response || (response.status >= 500 && response.status < 600)) {
        console.error("ticketsByClient error");
        return {
            status: response ? response.status : 500
        }
    }
    
    return response;
};

export const ticketByClient = async (token, ticketId) => {
    const user = AuthTokenGenerator.verify(token);
    if(!user) {
        return {
            status: 403
        }
    }

    const response = await SacClient.ticketByClient(user.cid, ticketId);

    if (!response || (response.status >= 500 && response.status < 600)) {
        console.error("ticketByClient error");
        return {
            status: response ? response.status : 500
        }
    }
    
    return response;
};

export const ticketByPurchase = async (token, purchaseId) => {
    const user = AuthTokenGenerator.verify(token);
    if(!user) {
        return {
            status: 403
        }
    }

    const response = await SacClient.ticketByPurchase(user.cid, purchaseId);

    if (!response || (response.status >= 500 && response.status < 600)) {
        console.error("ticketByPurchase error");
        return {
            status: response ? response.status : 500
        }
    }
    
    return response
};

export const addTicket = async (token, ticket) => {
    const user = AuthTokenGenerator.verify(token);
    if(!user) {
        return {
            status: 403
        }
    }

    const response = await SacClient.addTicket(user.cid, ticket);

    if (!response || (response.status >= 500 && response.status < 600)) {
        console.error("addTicket error");
        return {
            status: response ? response.status : 500
        }
    }
    
    return response
};

export const addTicketByPurchase = async (token, ticket, purchaseId) => {
    const user = AuthTokenGenerator.verify(token);
    if(!user) {
        return {
            status: 403
        }
    }

    const response = await SacClient.addTicketByPurchase(user.cid, ticket, purchaseId);

    if (!response || (response.status >= 500 && response.status < 600)) {
        console.error("addTicketByPurchase error");
        return {
            status: response ? response.status : 500
        }
    }
    
    return response
};

export const updateTicket = async (token, ticketId, ticket) => {
    const user = AuthTokenGenerator.verify(token);
    if(!user) {
        return {
            status: 403
        }
    }

    const response = await SacClient.updateTicket(user.cid, ticketId, ticket);

    if (!response || (response.status >= 500 && response.status < 600)) {
        console.error("updateTicket error");
        return {
            status: response ? response.status : 500
        }
    }
    
    return response
};

export const changeStatus = async (token, ticketId, message, statusId) => {
    const user = AuthTokenGenerator.verify(token);
    if(!user) {
        return {
            status: 403
        }
    }

    const response = await SacClient.changeStatus(user.cid, ticketId, message, statusId);

    if (!response || (response.status >= 500 && response.status < 600)) {
        console.error("changeStatus error");
        return {
            status: response ? response.status : 500
        }
    }
    
    return response
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