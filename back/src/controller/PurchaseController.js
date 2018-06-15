import moment from 'moment'

import ProductClient from '../service/produtos_client'
import Database, {updatePurchaseStatus} from "../database/database"
import AuthTokenGenerator from "../utils/AuthTokenGenerator"
import LogisticaClient from '../service/logistica_client'
import PaymentClient, {BOLETO_STATUS} from '../service/pagamento_client'

export const STATUS_PURCHASE = {
    order_ok: 1,
    payment_approved: 2,
    in_stock: 3,
    shipped: 4,
    delivered: 5,
    payment_reproved: 6
};

export const getPurchases = async (token) => {
    const user = AuthTokenGenerator.verify(token)

    if (!user) {
        return {
            status: 403
        }
    }

    let purchases = await Database.getPurchasesByClientId(user.cid)
    if (!purchases) {
        return {
            status: 404
        }
    }

    let responseData = []
    for (let purchase of purchases) {
        const reserves = await Database.getProductsFromCart(purchase.cartId)

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

        let data =  {
                id: purchase.id,
                status: purchase.status,
                createdAt: moment(purchase.createdAt).format('DD-MM-YYYY'),
                shipping: {
                    trackingCode: purchase.shippingCode,
                    deliverytime: purchase.deliveryTime,
                    price: purchase.price,
                    type: purchase.type,
                    address: {
                        identification: purchase.identification,
                        cep: purchase.cep,
                        street: purchase.street,
                        number: purchase.addressNumber,
                        neighborhood: purchase.neighborhood,
                        city: purchase.city,
                        state: purchase.state,
                        complement: purchase.complement
                    }    
                },
                payment: {
                    price: purchase.price,
                },
                products: products
            };
        
            if (purchase.boleto) {
                const boletoRes = await PaymentClient.getBankTicketStatus(purchase.paymentCode);
                const status = boletoRes.data.status;

                data.status = await updatePurchaseStatusThroughBoletoStatus(boletoRes, purchase);
                data.payment.boleto = {
                    status: status,
                    dueDate: moment(purchase.dueDate).format('DD-MM-YYYY'),
                    barCode: purchase.paymentCode,
                    documentRep: purchase.documentRep
                }
            } else {
                data.payment.card = {
                    number: purchase.payNumber,
                    brand: purchase.brand,
                    instalments: purchase.instalments
                }
            }
        
        responseData.push(data)
    }

    return {
        status: 200,
        data: responseData
    }
}

export const getPurchaseById = async (token, purchaseId) => {
    const user = AuthTokenGenerator.verify(token)

    if (!user) {
        return {
            status: 403
        }
    }

    const purchase = await Database.getPurchaseById(purchaseId);
    if (!purchase) {
        return {
            status: 404
        }
    }

    if (purchase.clientId && purchase.clientId !== user.cid) {
        return {
            status: 404
        }
    }

    const reserves = await Database.getProductsFromCart(purchase.cartId)

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

    const response =  {
        id: purchase.id,
        status: purchase.status,
        createdAt: moment(purchase.createdAt).format('DD-MM-YYYY'),
        shipping: {
            trackingCode: purchase.shippingCode,
            deliverytime: purchase.deliveryTime,
            price: purchase.price,
            type: purchase.type,
            address: {
                identification: purchase.identification,
                cep: purchase.cep,
                street: purchase.street,
                number: purchase.addressNumber,
                neighborhood: purchase.neighborhood,
                city: purchase.city,
                state: purchase.state,
                complement: purchase.complement
            }    
        },
        payment: {
            price: purchase.price,
        },
        products
    }

    
    if (purchase.boleto) {
        const boletoRes = await PaymentClient.getBankTicketStatus(purchase.paymentCode)
        const status = boletoRes.data.status

        response.status = await updatePurchaseStatusThroughBoletoStatus(boletoRes, purchase);
        response.payment.boleto = {
            status: status,
            dueDate: moment(purchase.dueDate).format('DD-MM-YYYY'),
            barCode: purchase.paymentCode,
            documentRep: purchase.documentRep
        }
    } else {
        response.payment.card = {
            number: purchase.payNumber,
            brand: purchase.brand,
            instalments: purchase.instalments
        }
    }

    return {
        status: 200,
        data: response
    }
}

export const getPurchaseTrackingById = async (token, purchaseId) => {
    const user = AuthTokenGenerator.verify(token)

    if (!user) {
        return {
            status: 403
        }
    }

    const purchase = await Database.getPurchaseById(purchaseId);
    if (!purchase) {
        return {
            status: 404
        }
    }

    if (purchase.clientId && purchase.clientId !== user.cid) {
        return {
            status: 404
        }
    }

    const trackingResponse = await LogisticaClient.getTracking(purchase.shippingCode)
    if (trackingResponse.status !== 200) {
        return {
            status: trackingResponse.status
        }
    }

    const response = {
        status: trackingResponse.data.status,
        purchaseId: purchaseId,
        type: purchase.type,
        price: purchase.price,
        deliveryTime: moment(purchase.deliveryTime).format('DD-MM-YYYY'),
        originCep: trackingResponse.data.cepOrigem,
        destinyCep: trackingResponse.data.cepDestino,
        weigth: trackingResponse.data.peso,
        packageType: trackingResponse.data.tipoPacote,
        heigth: trackingResponse.data.altura,
        width: trackingResponse.data.largura,
        length: trackingResponse.data.comprimento,
    }

    let history = []
    trackingResponse.data.historicoRastreio.forEach((item) => {
        history.push({
            datetime: item.hora,
            location: item.local,
            message: item.mensagem
        })
    })

    response.history = history

    return {
        status: 200,
        data: response
    }
}

export const updatePurchaseStatusThroughBoletoStatus = async (boletoRes, purchase) => {
    const status = boletoRes.data.status;
    let purchaseStatus = purchase.status;

    switch (status) {
        case BOLETO_STATUS.OK:
            if(purchase.status === STATUS_PURCHASE.order_ok) {
                purchaseStatus = STATUS_PURCHASE.payment_approved;
            }
            break;
        case BOLETO_STATUS.EXPIRED:
            if(purchase.status === STATUS_PURCHASE.order_ok) {
                purchaseStatus = STATUS_PURCHASE.payment_reproved;
            }
            break;
    }

    if(purchase.status !== purchaseStatus) {
        await Database.updatePurchaseStatus(purchase.id, purchaseStatus)
    }

    return purchaseStatus;
};

export default {
    getPurchaseById,
    getPurchaseTrackingById,
    getPurchases,
    STATUS_PURCHASE
}