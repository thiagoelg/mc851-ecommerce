import ProductClient from '../service/produtos_client'
import Database from "../database/database"
import AuthTokenGenerator from "../utils/AuthTokenGenerator"
import LogisticaClient from '../service/logistica_client'
import PaymentClient from '../service/pagamento_client'
import EnderecoClient from '../service/endereco_client'
import PurchaseController from './PurchaseController'

export const createCart = async (token) => {
    const user = AuthTokenGenerator.verify(token);

    const clientId = user ? user.cid : null;

    let cartId = await Database.createCart(clientId);

    return {
        status: 200,
        data: {cartId}
    }
};

export const associateClient = async (token, cartId) => {
    const user = AuthTokenGenerator.verify(token);

    const cart = await Database.getCartById(cartId);
    if (!cart) {
        return {
            status: 404
        }
    }

    const association = await checkUserToUseCart(token, user, cart);
    if (association.status !== 200) {
        return association;
    }

    // associate user to cart if cart has no user
    if (!cart.client_id) {
        await Database.associateClientIdToCart(cart.id, user.cid);
        return {
            status: 200
        }
    }

    return {
        status: 403
    }

};

export const reserveProduct = async (token, cartId, reservation) => {
    const user = AuthTokenGenerator.verify(token);

    const cart = await Database.getCartById(cartId);
    if (!cart) {
        return {
            status: 404
        }
    }

    const association = await checkUserToUseCart(token, user, cart);
    if (association.status !== 200) {
        return association;
    }

    const response = await ProductClient.reserveProduct(reservation.productId, reservation.amount);

    if (response.status === 400 || response.status === 404) {
        const code = response.status === 404 ? 1 : 2;
        return {
            status: 400,
            data: {
                code
            }
        }
    }

    const oldProduct = await Database.getProductFromCart(cartId, reservation.productId);

    if (oldProduct) {

        reservation.amount = parseInt(reservation.amount) + parseInt(oldProduct.amount);

        await Database.updateProduct(cartId, reservation.productId, reservation.amount)

    } else {
        await Database.addProduct(cartId, reservation.productId, reservation.amount)
    }

    return {
        status: 200
    }
};

export const releaseProduct = async (token, cartId, product) => {
    const user = AuthTokenGenerator.verify(token);

    const cart = await Database.getCartById(cartId);
    if (!cart) {
        return {
            status: 404
        }
    }

    const association = await checkUserToUseCart(token, user, cart);
    if (association.status !== 200) {
        return association;
    }

    const response = await ProductClient.releaseProduct(product.productId, product.amount);

    if (response.status === 400 || response.status === 404) {
        const code = response.status === 404 ? 1 : 2;
        return {
            status: 400,
            data: {
                code
            }
        }
    }

    const oldProduct = await Database.getProductFromCart(cartId, product.productId)

    if (oldProduct) {
        product.amount = parseInt(oldProduct.amount) - parseInt(product.amount)
    }

    await Database.updateProduct(cartId, product.productId, product.amount)

    return {
        status: 200
    }
};

export const getClientCartId = async (token) => {
    const user = AuthTokenGenerator.verify(token)

    if (!user) {
        return {
            status: 403
        }
    }

    const cart = await Database.getCartByClientId(user.cid);
    if(!cart) {
        return {
            status: 404
        }
    }

    let items = await Database.getProductsFromCart(cart.id);
    items = items.reduce((acc, item) => acc + item.amount, 0);

    return {
        status: 200,
        data: {
            cartId: cart.id,
            items: items
        }
    }
};

export const getCartById = async (token, cartId) => {
    const user = AuthTokenGenerator.verify(token);

    const cart = await Database.getCartById(cartId);

    if (!cart) {
        return {
            status: 404
        }
    }

    const association = await checkUserToUseCart(token, user, cart);
    if (association.status !== 200) {
        return association;
    }

    const reserves = await Database.getProductsFromCart(cartId);

    const products = await Promise.all(reserves
        .map(async p => {
            const response = await ProductClient.getProduct(p.product_id);
            const product = response.data;

            if (!product || response.status !== 200) {
                throw "couldnt find product";
            }

            return {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                amount: p.amount,
                brand: product.brand,
                tags: product.tags,
                categoryId: product.categoryId,
                imageUrl: product.imageUrl,
                weight: product.weight,
                length: product.length,
                width: product.width,
                height: product.height
            }
        }));

    return {
        status: 200,
        data: {
            id: cart.id,
            products: products
        }
    }
};

// TODO
export const checkout = async (token, cartId, data) => {
    const user = AuthTokenGenerator.verify(token)

    if (!user) {
        return {
            status: 403
        }
    }

    const cart = await Database.getCartById(cartId);
    if (!cart) {
        return {
            status: 404
        }
    }

    const association = await checkUserToUseCart(token, user, cart);
    if (association.status !== 200) {
        return association;
    }

    const address = await EnderecoClient.getCEP(data.shipping.address.cep)
    if (address.status !== 200 || !address.data) {
        return {
            status: 400,
            data: {
                code: 2
            }
        }
    }

    const products = await getProductsTO(cartId)
    const price = parseInt(data.payment.price)
    const product_sum = await getTotalPrice(products)

    // TODO: Somar frete no product_sum
    // if (price !== product_sum) {
    //     return {
    //         status: 400,
    //         data: {
    //             code: 3
    //         }
    //     }
    // }

    // PAYMENT
    let paymentData
    let paymentResponse

    if (data.payment.boleto) {
        const paymentData = {
            clientName: data.payment.name,
            cpf: data.payment.cpf,
            address: data.payment.address,
            cep: data.payment.cep,
            value: data.payment.price
        }
        paymentResponse = await PaymentClient.paymentByBankTicket(paymentData)
     
    } else {
        paymentData = {
            clientCardName: data.payment.card.name,
            cpf: data.payment.cpf,
            cardNumber: data.payment.card.number,
            month: data.payment.card.expiryMonth,
            year: data.payment.card.expiryYear,
            securityCode: data.payment.card.cvc,
            value: data.payment.price,
            instalments: data.payment.card.installments
        }

        paymentResponse = await PaymentClient.paymentByCreditCard(paymentData)
    } 

    //TODO: paymentResponse esta nulo, erro 404 em paymentByBankTicketq
    if (!paymentResponse) {
        return {
            status: 404
        }
    }
    if (paymentResponse.status !== 200) {
        return {
            status: 404
        }
    }
    if (paymentResponse.data.result === "UNAUTHORIZED") {
        return {
            status: 400,
            data: {
                code: 1
            }
        }
    }

    let status = PurchaseController.STATUS_PURCHASE.order_ok
    let paymentResultCode
    if (data.payment.boleto) {
        paymentResultCode = paymentResponse.data.code
    } else {
        status = PurchaseController.STATUS_PURCHASE.payment_approved
        paymentResultCode = paymentResponse.data.operationHash
    }

    // SHIPPING
    const measures = await calculateMeasures(products)
    const shippingData = {
        tipoEntrega: data.shipping.type,
        cepOrigem: '13083-852',
        cepDestino: data.shipping.address.cep,
        peso: measures.weight,
        tipoPacote: 'Caixa',
        comprimento: measures.length,
        altura: measures.height,
        largura: measures.width
    }

    const trackingResponse = await LogisticaClient.postShipment(shippingData)
    if (trackingResponse.status !== 200) {
        return {
            status: 404
        }
    }

    // CREATE PURCHASE
    const purchaseId = Database.createPurchase(cartId, user.cid, status, price, trackingResponse.codigoRastreio, paymentResultCode)

    Database.expireCart(cartId)
    
    // TODO enviar email

    return {
        status: 200,
        data: {
            purchaseId 
        }
    }
};

const getProductsTO = async (cartId) => {
    const reserves = await Database.getProductsFromCart(cartId);

    const products = await Promise.all(reserves
        .map(async p => {
            const response = await ProductClient.getProduct(p.product_id);
            const product = response.data;

            if (!product || response.status !== 200) {
                throw "couldnt find product";
            }

            return {
                id: product.id,
                price: product.price,
                amount: p.amount,
                weight: product.weight,
                length: product.length,
                width: product.width,
                height: product.height
            }
        }))
    return products
}

const getTotalPrice = async (products) => {
    let sum = 0
    for(let p of products) {
        sum += parseFloat(p.price) * parseInt(p.amount)
    }

    return sum
}

const calculateMeasures = async (products) => {
    let measures = {}
    measures.weight = products.map(product => product.weight).reduce((a, b) => a + b)
    measures.height = products.map(product => product.height).reduce((a, b) => a + b)
    measures.width = products.map(product => product.width).reduce((a, b) => a + b)
    measures.length = Math.max(...products.map(product => product.length))
    return measures
}

export const handleExpiredCarts = async () => {

    const expiredCarts = await Database.getExpiredCarts()

    expiredCarts.forEach(async (cart) => {
        const expiredProducts = await Database.getProductsFromCart(cart.id)

        expiredProducts.forEach(async (product) => {
            await ProductClient.releaseProduct(product.id, product.amount)

            await Database.updateProduct(cart.id, product.id, 0)
        });

        await Database.expireCart(cart.id)
    })
};

export const checkUserToUseCart = async (token, user, cart) => {
    if (token) {
        if (!user) {
            return {
                status: 403
            }
        }

        // check if cart belongs to another user
        if (cart.client_id && cart.client_id !== user.cid) {
            return {
                status: 403
            }
        }
    }

    return {
        status: 200
    }
};

export default {
    createCart,
    associateClient,
    reserveProduct,
    releaseProduct,
    checkout,
    handleExpiredCarts,
    getCartById,
    getClientCartId
}