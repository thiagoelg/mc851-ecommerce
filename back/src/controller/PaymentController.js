import PaymentClient from '../service/pagamento_client'

export const paymentByCreditCard = async (payment) => {
    const response = await PaymentClient.paymentByCreditCard(payment);
    
    if (!response) {
        console.error("paymentByCreditCard Error");
        return {}
    }
    else if(response.status !== 200) {
        console.error("paymentByCreditCard Error with status " + response.status);
        return {
            status: response.status,
            data: response.data
        };
    }

    return response.data
}

export const getCreditCardInstallments = async (info) => {
    const response = await PaymentClient.getCreditCardInstallments(info);
 
    if (!response) {
        console.error("getCreditCardInstallments Error");
        return {}
    }
    else if(response.status !== 200) {
        console.error("getCreditCardInstallments Error with status " + response.status);
        return {
            status: response.status,
            data: response.data
        };
    }

    return response.data
}

export const paymentByBankTicket = async (payment) => {
    const response = await PaymentClient.paymentByBankTicket(payment);

    if (!response) {
        console.error("paymentByBankTicket Error");
        return {}
    }
    else if(response.status !== 200) {
        console.error("paymentByBankTicket Error with status " + response.status);
        return {
            status: response.status,
            data: response.data
        };
    }

    return response.data
}


export const getBankTicketStatus = async (bankTicketId) => {
    const response = await PaymentClient.getBankTicketStatus(bankTicketId);

    if (!response) {
        console.error("getBankTicketStatus Error");
        return {}
    }
    else if(response.status !== 200) {
        console.error("getBankTicketStatus Error with status " + response.status);
        return {
            status: response.status,
            data: response.data
        };
    }

    return response.data
}


export const generateInvoice = async (info) => {
    const response = await PaymentClient.generateInvoice(info);

    if (!response) {
        console.error("generateInvoice Error");
        return {}
    }
    else if(response.status !== 200) {
        console.error("generateInvoice Error with status " + response.status);
        return {
            status: response.status,
            data: response.data
        };
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