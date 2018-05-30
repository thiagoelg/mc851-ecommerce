import express from 'express'
import CartController from '../controller/CartController'

const router = express.Router()

router.post('/', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");
        if (!token) {
            return res.sendStatus(401)
        }

        const response = CartController.createCart(token)

        return res.status(response.status).json(response.data);
    } catch (e) {
        next(e)
    }
})

router.post('/:cartId/book', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");
        if (!token) {
            return res.sendStatus(401)
        }

        if (!req.body) {
            return res.sendStatus(400)
        }
        
        const response = CartController.book(token, req.params.cartId, req.body)

        return res.status(response.status).json(response.data);
    } catch (e) {
        next(e)
    }
})

router.post('/:cartId/unbook', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");
        if (!token) {
            return res.sendStatus(401)
        }

        if (!req.body) {
            return res.sendStatus(400)
        }

        const response = CartController.unbook(token, req.params.cartId, req.body)

        return res.status(response.status).json(response.data);
    } catch (e) {
        next(e)
    }
})

router.post('/:cartId/checkout', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");
        if (!token) {
            return res.sendStatus(401)
        }

        const response = CartController.checkout(token, req.params.cartId)

        return res.status(response.status).json(response.data);
    } catch (e) {
        next(e)
    }
})


export default router
