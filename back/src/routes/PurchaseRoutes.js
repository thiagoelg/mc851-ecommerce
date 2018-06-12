import express from 'express'
import PurchaseController from '../controller/PurchaseController'

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");
        if (!token) {
            return res.sendStatus(403)
        }

        let response = await PurchaseController.getPurchases(token);
        return res.status(response.status).json(response.data)

    } catch (e) {
        next(e)
    }
});

router.get('/:purchaseId', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");
        if (!token) {
            return res.sendStatus(403);
        }

        let purchaseId = req.params.purchaseId;

        if (!purchaseId) {
            return res.sendStatus(400);
        }

        let response = await PurchaseController.getPurchaseById(token, purchaseId);
        return res.status(response.status).json(response.data)
        
    } catch (e) {
        next(e)
    }
});

router.get('/:purchaseId/tracking', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");
        if (!token) {
            return res.sendStatus(403);
        }

        let purchaseId = req.params.purchaseId;

        if (!purchaseId) {
            return res.sendStatus(400);
        }

        let response = await PurchaseController.getPurchaseTrackingById(token, purchaseId);
        return res.status(response.status).json(response.data)
        
    } catch (e) {
        next(e)
    }
});

export default router
