import express from 'express'

import ClientController from '../controller/ClientController'

const router = express.Router();

router.post('/', async (req, res, next) => {

    try {
        let info = req.body;

        if (!info.name ||
            !info.email ||
            !info.password ||
            !info.cpf ||
            !info.telephone) {
            return res.sendStatus(400);
        }

        let response = await ClientController.register(info);

        res.header('x-auth-token', response.data);
        return res.sendStatus(response.status);
    } catch (e) {
        next(e)
    }
});


router.post('/login/', async (req, res, next) => {

    try {
        let info = req.body;

        if (!info.email ||
            !info.password) {
            return res.sendStatus(400);
        }

        let response = await ClientController.login(info);

        res.header('x-auth-token', response.data);
        return res.sendStatus(response.status);
    } catch (e) {
        next(e)
    }
});


router.get('/', async (req, res, next) => {
    try {
        let token = req.get("x-auth-token");
        if (!token) {
            return res.sendStatus(400)
        }

        let response = await ClientController.getClient(token);
        return res.status(response.status).json(response.data);
    } catch (e) {
        next(e)
    }
});

router.put('/update/:id', async (req, res, next) => {

    try {
        let id = req.params.id;
        if (!id) {
            return res.sendStatus(400)
        }

        let info = req.body;

        let category = await ClientController.updateUser(id, info);

        return res.json(category)
    } catch (e) {
        next(e)
    }
});

router.put('/changePass/:id', async (req, res, next) => {

    try {
        let id = req.params.id;
        if (!id) {
            return res.sendStatus(400)
        }

        let info = req.body;

        if (!info.password ||
            !info.samePass) {
            return res.sendStatus(400)
        }

        let category = await ClientController.changePassword(id, info);

        return res.json(category)
    } catch (e) {
        next(e)
    }
});

router.delete('/delete/:id', async (req, res, next) => {

    try {
        let info = {};
        info.password = req.headers.password;

        let id = req.params.id;

        if (!id ||
            !info.password) {
            return res.sendStatus(400)
        }

        let category = await ClientController.deleteUser(id, info);

        return res.json(category)

    } catch (e) {
        next(e)
    }
});

export default router