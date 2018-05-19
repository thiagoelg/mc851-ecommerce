import express from 'express'

import ClientController from '../controller/ClientController'

const router = express.Router()

router.post('/register/', async (req, res, next) => {

    try{
        let info = req.body

        if(!info.name      ||
           !info.email     ||
           !info.password  ||
           !info.samePass  ||
           !info.birthDate ||
           !info.gender    ||
           !info.cep       ||
           !info.address   ||
           !info.telephone ||
           !info.cpf) {
            return res.sendStatus(400)
        }

        let id = await ClientController.register(info)

        return res.json(id)
    } catch (e) {
        next(e)
    }
})

router.put('/update/:id', async (req, res, next) => {

    try{
        let id = req.params.id
        if (!id) {
            return res.sendStatus(400)
        }

        let info = req.body

        if( !info.name      ||
            !info.password  ||
            !info.samePass) {
             return res.sendStatus(400)
        }

        let category = await ClientController.updateUser(id, info)

        return res.json(category)
    } catch (e) {
        next(e)
    }
})

router.get('/:id', async (req, res, next) => {

    try{
        let id = req.params.id
        if (!id) {
            return res.sendStatus(400)
        }

        let category = await ClientController.getClient(id)
        return res.json(category)
    } catch (e) {
        next(e)
    }
})

export default router
