import SacClient from '../service/sac_client'

export const ticketsByClient = async (clientId) => {
    const response = await SacClient.ticketsByClient(clientId);

    if (!response || response.status != 200) {
        console.error("ticketsByClient error");
        return {}
    }
    
    return response.data
}

export const ticketByClient = async (clientId, ticketId) => {
    const response = await SacClient.ticketByClient(clientId, ticketId);

    if (!response || response.status != 200) {
        console.error("ticketByClient error");
        return {}
    }
    
    return response.data
}

export const ticketByPurchase = async (clientId, purchaseId) => {
    const response = await SacClient.ticketByPurchase(clientId, purchaseId);

    if (!response || response.status != 200) {
        console.error("ticketByPurchase error");
        return {}
    }
    
    return response.data
}

export const addTicket = async (clientId, ticket) => {
    const response = await SacClient.addTicket(clientId, ticket);

    if (!response || response.status != 200) {
        console.error("addTicket error");
        return {}
    }
    
    return response.data
}

export const addTicketByPurchase = async (clientId, ticket, purchaseId) => {
    const response = await SacClient.addTicketByPurchase(clientId, ticket, purchaseId);

    if (!response || response.status != 200) {
        console.error("addTicketByPurchase error");
        return {}
    }
    
    return response.data
}

export const updateTicket = async (clientId, ticketId, ticket) => {
    const response = await SacClient.updateTicket(clientId, ticketId, ticket);

    if (!response || response.status != 200) {
        console.error("updateTicket error");
        return {}
    }
    
    return response.data
}

export const changeStatus = async (clientId, ticketId, ticket, params) => {
    const response = await SacClient.changeStatus(clientId, ticketId, ticket, params);

    if (!response || response.status != 200) {
        console.error("changeStatus error");
        return {}
    }
    
    return response.data
}

export default {
    ticketsByClient,
    ticketByPurchase,
    ticketByClient,
    addTicket,
    addTicketByPurchase,
    updateTicket,
    changeStatus
}