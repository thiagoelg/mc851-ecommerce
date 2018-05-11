import express from 'express'

import CreditClient from "../service/credito_client"

const router = express.Router()

router.get('/score/:cpf', async (req, res, next) => {
    try {
        if (!req.params.cpf) {
            res.sendStatus(400)
            return
        }

        let score = await CreditClient.getScore(req.params.cpf)

        return res.json(score)
    } catch (e) {
        next(e)
    }
})


router.post('/payment/:cpf', async (req, res, next) => {
    try {
        const payment = req.body
        if (!req.params.cpf || !payment || !payment.total_paid || !payment.total_value) {
            res.sendStatus(400)
            return
        }

        let response = await CreditClient.addPayment(req.params.cpf, payment)

        return res.json(response)
    } catch (e) {
        next(e)
    }  
})

export default router
