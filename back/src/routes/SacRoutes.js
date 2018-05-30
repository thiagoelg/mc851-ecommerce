import express from 'express'

import SacController from '../controller/SacController'

const router = express.Router();

router.get('/tickets', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");
        if (!token) {
            return res.sendStatus(403)
        }

        let response = await SacController.ticketsByClient(token);
        return res.status(response.status).json(response.data)

    } catch (e) {
        next(e)
    }
});

router.get('/tickets/:ticketId', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");
        if (!token) {
            return res.sendStatus(403);
        }

        let ticketId = req.params.ticketId;

        if (!ticketId) {
            return res.sendStatus(400);
        }

        let response = await SacController.ticketByClient(token, ticketId);
        return res.status(response.status).json(response.data)
        
    } catch (e) {
        next(e)
    }
});

router.get('/tickets/purchase/:compraId', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");
        if (!token) {
            return res.sendStatus(403);
        }

        let compraId = req.params.compraId;

        if (!compraId) {
            return res.sendStatus(400);
        }

        let response = await SacController.ticketByPurchase(token, compraId)
        return res.status(response.status).json(response.data)
        
    } catch (e) {
        next(e)
    }
});

router.post('/tickets', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");
        if (!token) {
            return res.sendStatus(403);
        }

        let ticket = req.body

        if (!ticket || !ticket.timestamp || !ticket.sender || !ticket.message) {
            return res.sendStatus(400);
        }

        let response = await SacController.addTicket(token, ticket);
        return res.status(response.status).json(response.data)

    } catch (e) {
        next(e)
    }
});

router.post('/tickets/purchase/:compraId', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");
        if (!token) {
            return res.sendStatus(403);
        }

        let compraId = req.params.compraId;

        let ticket = req.body;

        if (!compraId ||
            !ticket || 
            !ticket.timestamp || 
            !ticket.sender || 
            !ticket.message) {
            return res.sendStatus(400);
        }

        let response = await SacController.addTicketByPurchase(token, ticket, compraId)
        return res.status(response.status).json(response.data)
        
    } catch (e) {
        next(e)
    }
});

router.put('/tickets/:ticketId', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");
        if (!token) {
            return res.sendStatus(403);
        }

        let ticketId = req.params.ticketId;
    
        let ticket = req.body;

        if (!ticketId ||
            !ticket || 
            !ticket.timestamp || 
            !ticket.sender || 
            !ticket.message) {
            return res.sendStatus(400);
        }

        let response = await SacController.updateTicket(token, ticketId, ticket);
        return res.status(response.status).json(response.data)
        
    } catch (e) {
        next(e)
    }
});

router.delete('/tickets/:ticketId', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");
        if (!token) {
            return res.sendStatus(403);
        }

        let ticketId = req.params.ticketId;

        let statusId = req.query.statusId;
    
        let ticket = req.body;

        if (!ticketId ||
            !statusId ||
            !ticket || 
            !ticket.timestamp || 
            !ticket.sender || 
            !ticket.message) {
            return res.sendStatus(400);
        }

        let response = await SacController.changeStatus(token, ticketId, ticket, statusId);
        return res.status(response.status).json(response.data)
        
    } catch (e) {
        next(e)
    }
});

export default router