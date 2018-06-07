import express from 'express'
import PurchaseController from '../controller/PurchaseController'

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");

        const response = await PurchaseController.getPurchases(token, req.params.cartId);

        return res.status(response.status).json(response.data);
    } catch (e) {
        next(e)
    }
});

router.get('/:purchaseId', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");

        let purchaseId = req.params.purchaseId;
        if (!purchaseId) {
            return res.sendStatus(400);
        }

        const response = await PurchaseController.getPurchaseByID(token, purchaseId);

        return res.status(response.status).json(response.data);
    } catch (e) {
        next(e)
    }
});

router.get('/:purchaseId/tracking', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");

        let purchaseId = req.params.purchaseId;
        if (!purchaseId) {
            return res.sendStatus(400);
        }

        const response = await PurchaseController.getPurchaseTracking(token, purchaseId);

        return res.status(response.status).json(response.data);
    } catch (e) {
        next(e)
    }
});

export default router
