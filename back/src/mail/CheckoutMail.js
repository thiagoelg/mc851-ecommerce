const pug = require('pug');
const moment = require('moment');

import MailService from '../utils/MailService';
import { FRONT_URL } from '../serverConfig';

export const sendCheckoutEmail = async (userEmail, purchase, products, shippingPrice) => {

    let parsedProducts = []
    let subTotal = 0
    for (let product of products) {
        let price = product.amount * product.price;
        subTotal += price;
        parsedProducts.push({
            name: product.name,
            amount: product.amount,
            price: price,
        });
    }

    let pugParameters = {
        front: FRONT_URL,
        userName: purchase.identification,
        orderNumber: purchase.id,
        orderDate: moment(purchase.createdAt).format('DD/MM/YYYY'),
        orderAddress: {
            cep: purchase.cep,
            street: purchase.street,
            number: purchase.number,
            neighborhood: purchase.neighborhood,
            city: purchase.city,
            state: purchase.state,
            complement: purchase.complement,
        },
        orderProducts: parsedProducts,
        subTotal: subTotal,
        shippingPrice: shippingPrice/100,
        total: subTotal + (shippingPrice/100)
    }

    let html = pug.renderFile('/home/node/src/mail/templates/checkout.pug', pugParameters);

    let text = 'Olá, ' + purchase.identification + '. Seu pedido de número #' + purchase.id + ' foi efetuado e está sendo processado!';

    MailService.sendMail(userEmail, 'Toppenstore: Pedido efetuado!', text, html);

}

export default {
    sendCheckoutEmail
}