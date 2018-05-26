import express from 'express'

import Controller from '../controller/SacController'
import SacController from '../controller/SacController';

const router = express.Router()

router.get('/tickets/:clientId', async (req, res, next) => {
    try {
        let clientId = req.params.clientId

        if (!clientId) {
            res.sendStatus(400)
            return
        }

        let response = await SacController.ticketsByClient(clientId)
        return res.json(response)

    } catch (e) {
        next(e)
    }
})

router.get('/tickets/:clienteId/ticket/:ticketId', async (req, res, next) => {
    try {
        let clientId = req.params.clientId
        let ticketId = req.params.ticketId

        if (!clientId || !ticketId) {
            res.sendStatus(400)
            return
        }

        let response = await SacController.ticketByClient(clientId, ticketId)
        return res.json(response)
        
    } catch (e) {
        next(e)
    }
})

router.get('/tickets/:clienteId/compra/:compraId', async (req, res, next) => {
    try {
        let clientId = req.params.clientId
        let compraId = req.params.compraId

        if (!clientId || !compraId) {
            res.sendStatus(400)
            return
        }

        let response = await SacController.ticketByPurchase(clientId, compraId)
        return res.json(response)
        
    } catch (e) {
        next(e)
    }
})

router.post('/tickets/:clienteId', async (req, res, next) => {
    try {
        let clientId = req.params.clientId
        let ticket = req.body

        if (!clientId || !ticket || !ticket.timestamp || !ticket.sender || !ticket.message) {
            res.sendStatus(400)
            return
        }

        let response = await SacController.addTicket(clientId, ticket);
        return res.json(response)

    } catch (e) {
        next(e)
    }
})

router.post('/tickets/:clienteId/compra/:compraId', async (req, res, next) => {
    try {
        let clientId = req.params.clientId
        let compraId = req.params.compraId

        let ticket = req.body

        if (!clientId || 
            !compraId || 
            !ticket || 
            !ticket.timestamp || 
            !ticket.sender || 
            !ticket.message) {
            res.sendStatus(400)
            return
        }

        let response = await SacController.addTicketByPurchase(clientId, ticket, compraId)
        return res.json(response)
        
    } catch (e) {
        next(e)
    }
})

router.put('/tickets/:clienteId/ticket/:ticketId', async (req, res, next) => {
    try {
        let clientId = req.params.clientId
        let ticketId = req.params.ticketId
    
        let ticket = req.body

        if (!clientId || 
            !ticketId || 
            !ticket || 
            !ticket.timestamp || 
            !ticket.sender || 
            !ticket.message) {
            res.sendStatus(400)
            return
        }

        let response = await SacController.updateTicket(clientId, ticketId, ticket);
        return res.json(response)
        
    } catch (e) {
        next(e)
    }
})

router.delete('/tickets/:clienteId/ticket/:ticketId', async (req, res, next) => {
    try {
        let clientId = req.params.clientId
        let ticketId = req.params.ticketId

        let params = { 
            codeId : req.query.codeId
        }
    
        let ticket = req.body

        if (!clientId || 
            !ticketId || 
            !params.codeId ||
            !ticket || 
            !ticket.timestamp || 
            !ticket.sender || 
            !ticket.message) {
            res.sendStatus(400)
            return
        }

        let response = await SacController.changeStatus(clientId, ticketId, ticket, params);
        return res.json(response)
        
    } catch (e) {
        next(e)
    }
})

export default router