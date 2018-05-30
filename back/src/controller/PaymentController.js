import PaymentClient from '../service/pagamento_client'

export const paymentByCreditCard = async (payment) => {
    const response = await PaymentClient.paymentByCreditCard(payment);

    if (!response || response.status != 200) {
        console.error("paymentByCreditCard error");
        return []
    }

    return response.data
}

export const getCreditCardInstallments = async (info) => {
    const response = await PaymentClient.getCreditCardInstallments(info);

    if (!response || response.status != 200) {
        console.error("getCreditCardInstallments error");
        return []
    }

    return response.data
}

export const paymentByBankTicket = async (payment) => {
    const response = await PaymentClient.paymentByBankTicket(payment);

    if (!response || response.status != 200) {
        console.error("paymentByBankTicket error");
        return []
    }

    return response.data
}


export const getBankTicketStatus = async (bankTicketId) => {
    const response = await PaymentClient.getBankTicketStatus(bankTicketId);

    if (!response || response.status != 200) {
        console.error("getBankTicketStatus error");
        return []
    }

    return response.data
}


export const generateInvoice = async (info) => {
    const response = await PaymentClient.generateInvoice(info);

    if (!response || response.status != 200) {
        console.error("generateInvoice error");
        return []
    }

    return response.data
}

export default {
    paymentByCreditCard,
    getCreditCardInstallments,
    paymentByBankTicket,
    getBankTicketStatus,
    generateInvoice
}