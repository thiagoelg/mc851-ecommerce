import express from 'express'

import PaymentController from '../controller/PaymentController'

const router = express.Router()

router.post('/creditCard', async (req, res, next) => {

    try {
        let info = req.body

        if(!info ||
           !info.clientCardName ||
           !info.cpf ||
           !info.cardNumber ||
           !info.month ||
           !info.year ||
           !info.securityCode ||
           !info.value ||
           !info.instalments) {
            res.sendStatus(400)
            return
        }

        let response = await PaymentController.paymentByCreditCard(info)
        return res.json(response)
    } catch (e) {
        next(e)
    }
})

router.post('/creditCard/installments', async (req, res, next) => {

    try {
        let info = req.body

        if(!info ||
           !info.value ||
           !info.cardFlag) {
            res.sendStatus(400)
            return
        }

        let response = await PaymentController.getCreditCardInstallments(info)
        return res.json(response)
    } catch (e) {
        next(e)
    }
})

router.post('/backticket', async (req, res, next) => {

    try {
        let info = req.body

        if(!info ||
           !info.clientName ||
           !info.cpf ||
           !info.address ||
           !info.cep ||
           !info.value) {
            res.sendStatus(400)
            return
        }

        let response = await PaymentController.paymentByBankTicket(info)
        return res.json(response)
    } catch (e) {
        next(e)
    }
})

router.get('/backticket/:code/status', async (req, res, next) => {

    try {

        let code = req.params.code
        
        if (!code) {
            res.sendStatus(400)
            return
        }

        let response = await PaymentController.getBankTicketStatus(code)
        return res.json(response)
    } catch (e) {
        next(e)
    }
})

router.post('/invoice', async (req, res, next) => {

    try {

        let info = req.body
        
        if(!info ||
           !info.clientData ||
           !info.clientData.fullName ||
           !info.clientData.cpf ||
           !info.clientData.address ||
           !info.clientData.address.cep ||
           !info.clientData.address.street ||
           !info.clientData.address.number ||
           !info.clientData.address.comp ||
           !info.clientData.address.neighbour ||
           !info.products ||
           !info.netWeight ||
           !info.grossWeight ||
           !info.value ||
           !info.transportValue ||
           !info.discountValue ||
           !info.totalValue) {
            res.sendStatus(400)
            return
        }

        for(let product in products) {
            if(!product.name ||
               !product.amount ||
               !product.unityValue ||
               !product.totalValue ||
               !product.tributs) {
                res.sendStatus(400)
                return
            }
        }

        let response = await PaymentController.generateInvoice(info)
        return res.json(response)
    } catch (e) {
        next(e)
    }
})

export default router