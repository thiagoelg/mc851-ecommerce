import {
    associateCartToClient,
    book,
    checkout,
    createCart,
    getCartById,
    getClientCartId,
    unbook
} from "../clients/CartClient";
import Product from "./Product";
import {CartResult} from "./CartResult";

const CART_ID_ITEM_NAME = 'cart-ecommerce';
const CART_COUNTER_ITEM_NAME = 'cart-counter-ecommerce';

class Reservation {

    constructor(productId, amount) {
        this.productId = productId;
        this.amount = amount;
    }

}

class CartContext {

    constructor(result, cart) {
        this.result = result;

        if (cart) {
            this.id = cart.id;
            this.products = cart.products.map(product => new Product(product))
        }
    }

}

class CheckoutResult {

    constructor(result, purchaseId) {
        this.result = result;
        this.purchaseId = purchaseId;
    }

}

class Cart {

    constructor() {
        this.load();
    }

    load() {
        this.id = localStorage.getItem(CART_ID_ITEM_NAME);
        if (this.id) {
            let item = localStorage.getItem(CART_COUNTER_ITEM_NAME);
            this.numberOfProducts = item ? parseInt(item, 10) : 0;
        } else {
            this.numberOfProducts = 0;
        }
    }

    clear() {
        localStorage.removeItem(CART_ID_ITEM_NAME);
        localStorage.removeItem(CART_COUNTER_ITEM_NAME);

        this.id = null;
        this.numberOfProducts = 0;
    }


    updateNumberOfProducts(amount) {
        this.numberOfProducts += parseInt(amount, 10);
        localStorage.setItem(CART_COUNTER_ITEM_NAME, this.numberOfProducts);
    }

    updateCartId(cartId) {
        this.id = cartId;
        localStorage.setItem(CART_ID_ITEM_NAME, this.id);
    }

    async createCart() {
        try {

            const response = await createCart();
            const data = response.data;

            this.updateCartId(data.cartId);
            this.updateNumberOfProducts(0);

            return CartResult.SUCCESS;

        } catch (error) {
            const response = error.response;

            if (response) {
                switch (response.status) {
                    case 500:
                        return CartResult.INTERNAL_ERROR;
                    default:
                        return CartResult.ERROR;
                }
            }
        }

        return CartResult.ERROR;
    }

    async add(productId, amount) {

        if (!this.id) {
            const result = await this.createCart();
            if (result !== CartResult.SUCCESS) {
                return result;
            }
        }

        const reservation = new Reservation(productId, amount);
        try {
            await book(this.id, reservation);

            this.updateNumberOfProducts(amount);

            return CartResult.SUCCESS;
        } catch (error) {
            const response = error.response;

            if (response) {
                switch (response.status) {
                    case 400: {
                        const code = response.data.code;
                        switch (code) {
                            case 1:
                                return CartResult.PRODUCT_NOT_FOUND;
                            case 2:
                                return CartResult.OUT_OF_STOCK;
                            default:
                                return CartResult.ERROR;
                        }
                    }
                    case 404: {
                        this.clear();
                        return this.add(productId, amount);
                    }
                    case 500:
                        return CartResult.INTERNAL_ERROR;
                    default:
                        return CartResult.ERROR;
                }
            }
        }

        return CartResult.ERROR;
    }

    async remove(productId, amount) {
        if (!this.id) {
            return CartResult.EXPIRED;
        }

        const reservation = new Reservation(productId, amount);

        try {
            await unbook(this.id, reservation);

            this.updateNumberOfProducts(-amount);

            return CartResult.SUCCESS;
        } catch (error) {
            const response = error.response;

            if (response) {
                switch (response.status) {
                    case 400: {
                        const code = response.data.code;
                        switch (code) {
                            case 1:
                                return CartResult.PRODUCT_NOT_FOUND;
                            case 2:
                                return CartResult.OUT_OF_STOCK;
                            default:
                                return CartResult.ERROR;
                        }
                    }
                    case 404: {
                        this.clear();
                        return CartResult.EXPIRED;
                    }
                    case 500:
                        return CartResult.INTERNAL_ERROR;
                    default:
                        return CartResult.ERROR;
                }
            }
        }

        return CartResult.ERROR;
    }

    async getContext() {
        if (!this.id) {
            return new CartContext(CartResult.EXPIRED);
        }

        try {

            const response = await getCartById(this.id);
            const cart = response.data;
            return new CartContext(CartResult.SUCCESS, cart);

        } catch (error) {

            const response = error.response;

            if (response) {
                switch (response.status) {
                    case 404:
                        this.clear();
                        return new CartContext(CartResult.EXPIRED);
                    case 500:
                        return new CartContext(CartResult.INTERNAL_ERROR);
                    default:
                        return new CartContext(CartResult.ERROR);
                }
            }

        }

        return new CartContext(CartResult.ERROR);
    }

    async addClient() {
        if (this.id) {

            try {
                await associateCartToClient(this.id);
                return CartResult.SUCCESS;
            } catch (error) {
                const response = error.response;

                if (response) {
                    switch (response.status) {
                        case 404:
                            this.clear();
                            return CartResult.EXPIRED;
                        case 500:
                            return CartResult.INTERNAL_ERROR;
                        default:
                            return CartResult.ERROR;
                    }
                }
            }

        } else {
            try {
                const response = await getClientCartId();
                const data = response.data;

                this.updateCartId(data.cartId);
                this.updateNumberOfProducts(data.items);
                return CartResult.SUCCESS;
            } catch (error) {
                const response = error.response;

                if (response) {
                    switch (response.status) {
                        case 404:
                            this.clear();
                            return CartResult.EXPIRED;
                        case 500:
                            return CartResult.INTERNAL_ERROR;
                        default:
                            return CartResult.ERROR;
                    }
                }
            }
        }

        return CartResult.ERROR;
    }

    async checkout(shipping, address, payment, price) {
        let card = {};

        if (payment.isCreditCard) {
            const splittedValidThru = payment.card.validThru.split("/");
            const month = splittedValidThru[0];
            const year = splittedValidThru[1];

            card = {
                name: payment.card.identification,
                number: payment.card.cardNumber,
                expiryMonth: month,
                expiryYear: year,
                cvc: payment.card.securityCode,
                brand: payment.card.brand,
                installments: payment.card.installments,
            };
        }

        const params = {
            shipping: {
                deliveryTime: shipping.deliveryTime,
                price: shipping.price,
                type: shipping.type,
                address: {
                    identification: address.identification,
                    cep: address.cep,
                    street: address.street,
                    number: address.number,
                    neighborhood: address.neighborhood,
                    city: address.city,
                    state: address.state,
                    complement: address.complement,
                }
            },
            payment: {
                price: price * 100,
                card: card,
                boleto: payment.isBoleto
            }
        };

        try {
            const response = await checkout(this.id, params)
            const purchaseId = response.data.purchaseId;

            return new CheckoutResult(CartResult.SUCCESS, purchaseId);
        } catch (error) {
            const response = error.response;

            if (response) {
                switch (response.status) {
                    case 400: {
                        const code = response.data.code;
                        switch (code) {
                            case 1:
                                return new CheckoutResult(CartResult.UNSUPPORTED_INSTALLMENTS);
                            case 2:
                                return new CheckoutResult(CartResult.INVALID_CEP);
                            case 3:
                                return new CheckoutResult(CartResult.UNAUTHORIZED_PAYMENT);
                            default:
                                return new CheckoutResult(CartResult.ERROR);
                        }
                    }
                    case 404:
                        this.clear();
                        return new CheckoutResult(CartResult.EXPIRED);
                    case 500:
                        return new CheckoutResult(CartResult.INTERNAL_ERROR);
                    default:
                        return new CheckoutResult(CartResult.ERROR);
                }
            }
        }

        return new CheckoutResult(CartResult.ERROR);
    }

    getNumberOfProducts() {
        if (!this.numberOfProducts) {
            return 0;
        }
        return this.numberOfProducts;
    }
}

export const cart = new Cart();