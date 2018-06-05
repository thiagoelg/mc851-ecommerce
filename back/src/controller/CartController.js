import ProductClient from '../service/produtos_client'
import Database from "../database/database"
import AuthTokenGenerator from "../utils/AuthTokenGenerator"

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
export const checkout = async (token, cartId) => {
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

    // TODO gerar codigo de rastreio com logistica
    // TODO integrar com pagamentos
    // TODO criar a compra
    // TODO fechar carrinho para que ele nao possa expirar
    // TODO enviar email

    return {
        status: 200
    }
};


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