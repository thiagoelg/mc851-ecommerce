import express from 'express'

import ClientController from '../controller/ClientController'

const router = express.Router();

router.post('/', async (req, res, next) => {

    //TODO validations
    try {
        let categories = await ClientController.register(req.body.params);
        return res.json(categories);
    } catch (e) {
        next(e)
    }
});

router.post('/login', async (req, res, next) => {

    //TODO validations
    try {
        let categories = await ClientController.login(req.body.params);
        return res.json(categories);
    } catch (e) {
        next(e)
    }
});

export default router