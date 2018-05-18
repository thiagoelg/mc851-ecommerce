import axios from 'axios'

const REQUEST_TIMEOUT = 30000
const ATENDIMENTO_URL = "https://centralatendimento-mc857.azurewebsites.net/"
const SITE_ID = "67aecd253f0c9abd35cde4c4039af1f1a4d83eb5"

export const ticketsByClient = async (clientId) => {
    try {
        const response = await axios.get(`${ATENDIMENTO_URL}/tickets/${SITE_ID}/${clientId}`)

        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export const ticketByPurchase = async (clientId, purchaseId) => {
    try {
        const response = await axios.get(`${ATENDIMENTO_URL}/tickets/${SITE_ID}/${clientId}/compra/${purchaseId}`)
        
        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export const ticketByClient = async (clientId, ticketId) => {
    try {
        const response = await axios.get(`${ATENDIMENTO_URL}/tickets/${SITE_ID}/${clientId}/ticket/${ticketId}`)
        
        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export const addTicket = async (clientId, ticket) => {
    try {
        const response = await axios.post(`${ATENDIMENTO_URL}/tickets/${SITE_ID}/${clientId}`, ticket)

        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export const addTicketByPurchase = async (clientId, ticket, purchaseId) => {
    try {
        const response = await axios.post(`${ATENDIMENTO_URL}/tickets/${SITE_ID}/${clientId}/compra/${purchaseId}`, ticket)
        
        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export const updateTicket = async (clientId, ticketId, ticket) => {
    try {
        const response = await axios.put(`${ATENDIMENTO_URL}/tickets/${SITE_ID}/${clientId}/ticket/${ticketId}`, ticket)
        
        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export const changeStatus = async (clientId, ticketId, params) => {
    try {
        const response = await axios.delete(`${ATENDIMENTO_URL}/tickets/${SITE_ID}/${clientId}/ticket/${ticketId}`, {
            params
        })
        
        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
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