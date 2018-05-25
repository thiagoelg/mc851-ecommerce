import express from 'express'
import AddressController from "../controller/AddressController";

const router = express.Router();

router.get('/states', async (req, res, next) => {
    try {
        let response = await AddressController.getStates();
        return res.status(response.status).json(response.data);
    } catch (e) {
        next(e)
    }
});

router.get('/states/:uf/cities', async (req, res, next) => {
    try {
        let uf = req.params.uf;
        if (!uf) {
            return res.sendStatus(404);
        }

        let response = await AddressController.getCities(uf);
        return res.status(response.status).json(response.data);
    } catch (e) {
        next(e)
    }
});

router.get('/cep/:cep', async (req, res, next) => {
    try {
        let cep = req.params.cep;
        if (!cep) {
            return res.sendStatus(404);
        }

        let response = await AddressController.getCep(cep);
        return res.status(response.status).json(response.data);
    } catch (e) {
        next(e)
    }
});

export default router
