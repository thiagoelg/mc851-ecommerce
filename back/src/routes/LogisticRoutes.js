import express from 'express'
import LogisticController from '../controller/LogisticController';
import LogisticService from '../service/logistica_client'

const router = express.Router()

const cepUnicamp = 13083970

router.get('/shipping', async (req, res, next) => {
    try {

        let allShipping = [];

        for (let shippingType in LogisticService.SHIPPING_TYPE) {

            let params = {
                tipoEntrega  : req.query.shippingType || shippingType,
                cepOrigem    : req.query.originCep    || cepUnicamp,
                cepDestino   : req.query.destinyCep,
                peso         : req.query.weight,
                tipoPacote   : req.query.packetType   || LogisticService.PACKET_TYPE.BOX,
                comprimento  : req.query.length,
                altura       : req.query.height,
                largura      : req.query.width
            };

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

            let shipping = await LogisticController.getShipment(params);
            allShipping.push({
                price: shipping.preco,
                type: shippingType,
                deliveryTime: shipping.prazo
            });

        }
        return res.json(allShipping)

    } catch(e) {
        next(e)
    }
});

export default router