import express from 'express'
import LogisticController from '../controller/LogisticController';
import LogisticService from '../service/logistica_client'

const router = express.Router()

const cepUnicamp = 13083970

router.get('/shipping', async (req, res, next) => {
        try {
        let params = {
            cepOrigem    : req.query.originCep    || cepUnicamp,
            cepDestino   : req.query.destinyCep,  
            peso         : req.query.weight       || 1000,
            tipoPacote   : req.query.packetType   || LogisticService.PACKET_TYPE.BOX,
            comprimento  : req.query.length       || 10,
            altura       : req.query.height       || 10,
            largura      : req.query.width        || 10    
        };

        if (!params.cepOrigem ||
            !params.cepDestino ||
            !params.peso ||
            !params.tipoPacote ||
            !params.comprimento ||
            !params.altura ||
            !params.largura ) {
            return res.sendStatus(400)
        }

        let shipping = await LogisticController.getShipments(params);

        let formated_shipping = []
        Object.keys(shipping.data).forEach(function(key) {
            formated_shipping.push({
                type: key,
                price: shipping.data[key].preco,
                deliveryTime: shipping.data[key].prazo
            })
        });

        return res.status(shipping.status).json(formated_shipping)

    } catch(e) {
        next(e)
    }
});

router.get('/getTracking/:codRastreio', async (req, res, next) => {
    try {

        let codRastreio = req.params.codRastreio
        if (!codRastreio) {
            return res.sendStatus(400)
        }

        let tracking = await LogisticController.getTracking(codRastreio);
        return res.json(tracking)

    } catch(e) {
        next(e)
    }
});

export default router