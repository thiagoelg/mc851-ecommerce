import express from 'express'

import LogisticClient from "../service/logistica_client"
import AddressClient from "../service/endereco_client"

const router = express.Router()
const cepUnicamp = 13083970

router.get('/shipping', async (req, res) => {

    let params = {
        tipoEntrega  : req.query.tipoEntrega,
        cepOrigem    : req.query.cepOrigem    || cepUnicamp,
        cepDestino   : req.query.cepDestino,
        peso         : req.query.peso         || 0,
        tipoPacote   : req.query.tipoPacote   || "Caixa",
        comprimento  : req.query.comprimento  || 0,
        altura       : req.query.altura       || 0,
        largura      : req.query.largura      || 0,
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

    //let validOrigem = await AddressClient.isCepValid(params.cepOrigem)
    //let validDestino = await AddressClient.isCepValid(params.cepDestino)

    let shipping = await LogisticClient.getShipping(params)
    return res.json(shipping)
})

export default router