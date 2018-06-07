import moment from 'moment'

import ProductClient from '../service/produtos_client'
import Database from "../database/database"
import AuthTokenGenerator from "../utils/AuthTokenGenerator"
import LogisticaClient from '../service/logistica_client'

export const STATUS_PURCHASE = {
    order_ok: 1,
    payment_approved: 2,
    in_stock: 3,
    shipped: 4,
    delivered: 5
}

export const getPurchases = async (token) => {
    const user = AuthTokenGenerator.verify(token)

    if (!user) {
        return {
            status: 403
        }
    }

    const purchases = await Database.getPurchasesByClientId(user.cid)
    if (!purchases) {
        return {
            status: 404
        }
    }

    if (purchase.clientId && purchase.clientId !== user.cid) {
        return {
            status: 403
        }
    }

    let response = []
    purchases.forEach(async (purchase) => {
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

        response.push ({
            id: purchase.id,
            status: purchase.status,
            createdAt: moment(purchase.createdAt).format('DD-MM-YYYY'),
            shipping: {
                code: purchase.shippingCode    
            },
            payment: {
                price: purchase.price,
                code: purchase.paymentCode
            },
            products
        })
    })

    return {
        status: 200,
        data: response
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


    return {
        status: 200,
        data: {
            id: purchase.id,
            status: purchase.status,
            createdAt: moment(purchase.createdAt).format('DD-MM-YYYY'),
            shipping: {
                code: purchase.shippingCode    
            },
            payment: {
                price: purchase.price,
                code: purchase.paymentCode
            },
            products
        }
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

    const trackingResponse = LogisticaClient.getTracking(purchase.shippingCode)
    if (trackingResponse.status !== 200) {
        return {
            status: trackingResponse.status
        }
    }

    return {
        status: 200,
        data: trackingResponse.data
    }
}

export default {
    getPurchaseById,
    getPurchaseTrackingById,
    getPurchases,
    STATUS_PURCHASE
}