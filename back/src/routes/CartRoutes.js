import express from 'express'
import CartController from '../controller/CartController'

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");

        const response = await CartController.createCart(token);

        return res.status(response.status).json(response.data);
    } catch (e) {
        next(e)
    }
});

router.post('/:cartId', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");

        const response = await CartController.associateClient(token, req.params.cartId);

        return res.status(response.status).json(response.data);
    } catch (e) {
        next(e)
    }
});

router.get('/', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");

        const response = await CartController.getClientCartId(token);

        return res.status(response.status).json(response.data);
    } catch (e) {
        next(e)
    }
});

router.get('/:cartId', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");

        const response = await CartController.getCartById(token, req.params.cartId);

        return res.status(response.status).json(response.data);
    } catch (e) {
        next(e)
    }
});

router.post('/:cartId/book', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");

        if (!req.body) {
            return res.sendStatus(400)
        }
        
        const response = await CartController.reserveProduct(token, req.params.cartId, req.body)

        return res.status(response.status).json(response.data);
    } catch (e) {
        next(e)
    }
});

router.post('/:cartId/unbook', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");

        if (!req.body) {
            return res.sendStatus(400)
        }

        const response = await CartController.releaseProduct(token, req.params.cartId, req.body)

        return res.status(response.status).json(response.data);
    } catch (e) {
        next(e)
    }
});

router.post('/:cartId/checkout', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");
        if (!token) {
            return res.sendStatus(403)
        }


        if (!req.body) {
            return res.sendStatus(400)
        }

        const response = await CartController.checkout(token, req.params.cartId, req.body)

        return res.status(response.status).json(response.data);
    } catch (e) {
        next(e)
    }
});


export default router
