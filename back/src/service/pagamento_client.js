import axios from 'axios'

const REQUEST_TIMEOUT = 30000
const PAGAMENTO_URL = "https://payment-server-mc851.herokuapp.com"

export const BOLETO_STATUS = {
    PENDING: "PENDING_PAYMENT",
    OK: "OK",
    EXPIRED: "EXPIRED",
    NOT_FOUND: "NOT_FOUND"
};

export const paymentByCreditCard = async (payment) => {
    try {
        const response = await axios.post(`${PAGAMENTO_URL}/payments/creditCard`, payment)

        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export const getCreditCardInstallments = async (info) => {
    try {
        const response = await axios.post(`${PAGAMENTO_URL}/payments/creditCard/installments`, info)

        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export const paymentByBankTicket = async (payment) => {
    try {
        const response = await axios.post(`${PAGAMENTO_URL}/payments/bankTicket`, payment)

        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}


export const getBankTicketStatus = async (bankTicketId) => {
    try {
        const response = await axios.get(`${PAGAMENTO_URL}/payments/bankTicket/${bankTicketId}/status`)

        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}


export const generateInvoice = async (info) => {
    try {
        const response = await axios.post(`${PAGAMENTO_URL}/invoice`, info)

        return {data : response.data, status: response.status}
    } catch (e) {
        console.log(e)
    }
}

export default {
    paymentByCreditCard,
    getCreditCardInstallments,
    paymentByBankTicket,
    getBankTicketStatus,
    generateInvoice,
    BOLETO_STATUS
}