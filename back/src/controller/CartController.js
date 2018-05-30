import ProductClient from '../service/produtos_client'
import Database from "../database/database"
import AuthTokenGenerator from "../utils/AuthTokenGenerator"

export const createCart = async (token) => {
    const decoded = AuthTokenGenerator.verify(token)

    if(!decoded) {
        return {
            status: 403
        }
    }

    let cartId;

    cartId = await Database.createCart(decoded.cid);

    return {
        status: 200,
        data: { cartId }
    }
}

export const reserveProduct = async (token, cartId, product) => {
    const decoded = AuthTokenGenerator.verify(token)

    if(!decoded) {
        return {
            status: 403
        }
    }

    const cart = await Database.getCartById(cartId)
    if (!cart) {
        return {
            status: 404
        }
    }

    const response = await ProductClient.reserveProduct(product.id, product.amount)

    if (response.status === 400 || response.status == 404) {
        const code = response.status === 404 ? 1 : 2
        return {
            status: 400, 
            data: {
                code
            }
        }
    }

    const oldProduct = await Database.getProductFromCart(cartId, product.id)

    if (oldProduct) {
        product.amount += oldProduct.amount

        await Database.addProduct(cartId, product.id, product.amount)
    } else {
        await Database.updateProduct(cartId, product.id, product.amount)
    }

    return {
        status: 200
    }
}

export const releaseProduct = async (token, cartId, product) => {
    const decoded = AuthTokenGenerator.verify(token)

    if(!decoded) {
        return {
            status: 403
        }
    }

    const cart = await Database.getCartById(cartId)
    if (!cart) {
        return {
            status: 404
        }
    }

    const response = await ProductClient.releaseProduct(product.id, product.amount)

    if (response.status === 400 || response.status == 404) {
        const code = response.status === 404 ? 1 : 2
        return {
            status: 400, 
            data: {
                code
            }
        }
    }

    const oldProduct = await Database.getProductFromCart(cartId, product.id)

    if (oldProduct) {
        product.amount -= oldProduct.amount
    }

    await Database.updateProduct(cartId, product.id, product.amount)

    return {
        status: 200
    }
}

// TODO
export const checkout = async (token, cartId) => {
    const decoded = AuthTokenGenerator.verify(token)

    if(!decoded) {
        return {
            status: 403
        }
    }

    return {
        status: 200
    }
}

export const handleExpiredCarts = async () => {
    const expiredCarts = await Database.getExpiredCarts()

    expiredCarts.forEach(async (cart) => {
        const expiredProducts = await Database.getProductsFromCart(cart.id)

        expiredProducts.forEach(async (product) => {
            await ProductClient.releaseProduct(product.id, product.amount)
        })

        await Database.expireCart(cart.id)
    })
}

export default {
    createCart,
    reserveProduct,
    releaseProduct,
    checkout,
    handleExpiredCarts
}