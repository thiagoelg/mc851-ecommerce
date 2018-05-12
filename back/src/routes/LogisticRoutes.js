import express from 'express'

import LogisticClient from "../service/logistica_client"
import AddressClient from "../service/endereco_client"

const router = express.Router()
const cepUnicamp = 13083970

router.get('/shipping', async (req, res) => {
    try {

        let params = {
            tipoEntrega  : req.query.tipoEntrega  || "PAC",
            cepOrigem    : req.query.cepOrigem    || cepUnicamp,
            cepDestino   : req.query.cepDestino,
            peso         : req.query.peso         || 1000,
            tipoPacote   : req.query.tipoPacote   || "Caixa",
            comprimento  : req.query.comprimento  || 10,
            altura       : req.query.altura       || 10,
            largura      : req.query.largura      || 10,
        }
        
        if (!params.tipoEntrega ||
            !params.cepOrigem ||
            !params.cepDestino ||
            !params.peso ||
            !params.tipoPacote ||
            !params.comprimento ||
            !params.altura ||
            !params.largura ) {
            return res.sendStatus(400)
        }

        let shipping = await LogisticClient.getShipment(params)
        return res.json(shipping)

    } catch(e) {
        next(e)
    }
})

export default router