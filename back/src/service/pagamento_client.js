import axios from 'axios'

const REQUEST_TIMEOUT = 30000
const PAGAMENTO_URL = "https://payment-server-mc851.herokuapp.com/"

export const paymentByCreditCard = async (payment) => {
    try {
        const response = await axios.post(`${PAGAMENTO_URL}/payments/creditCard`, payment)

        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const getCreditCardInstallments = async (info) => {
    try {
        const response = await axios.post(`${PAGAMENTO_URL}/payments/creditCard/installments`, info)

        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const paymentByBankTicket = async (payment) => {
    try {
        const response = await axios.post(`${PAGAMENTO_URL}/payments/bankTicket`, payment)

        return response.data
    } catch (e) {
        console.log(e)
    }
}


export const getBankTicketStatus = async (bankTicketId) => {
    try {
        const response = await axios.get(`${PAGAMENTO_URL}/bankTicket/${bankTicketId}`)

        return response.data
    } catch (e) {
        console.log(e)
    }
}


export const generateInvoice = async (info) => {
    try {
        const params = {
            params: info
        }

        const response = await axios.post(`${PAGAMENTO_URL}/invoice`, info)

        return response.data
    } catch (e) {
        console.log(e)
    }
}

export default {
    paymentByCreditCard,
    getCreditCardInstallments,
    paymentByBankTicket,
    getBankTicketStatus,
    generateInvoice
}