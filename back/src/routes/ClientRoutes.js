import express from 'express'

import ClientController from '../controller/ClientController'

const router = express.Router();

router.post('/', async (req, res, next) => {

    try {
        if (!req.body.name ||
            !req.body.email ||
            !req.body.cpf ||
            !req.body.telephone ||
            !req.body.password ||
            !req.body.samePass) {
            return res.sendStatus(400);
        }

        let categories = await ClientController.register(req.body.params);
        return res.json(categories);
    } catch (e) {
        next(e)
    }
});

router.post('/login', async (req, res, next) => {

    try {
        if (!req.body.params.email ||
            !req.body.params.password) {
            return res.sendStatus(400);
        }

        let categories = await ClientController.login(req.body.params);
        return res.json(categories);
    } catch (e) {
        next(e)
    }
});

export default router