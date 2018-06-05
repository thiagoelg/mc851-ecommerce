import {getShippingOptions} from "../clients/LogisticClient";
import {setCartClient, getClientCartId, getCartById, createCart, addProductToCart, removeProductFromCart} from "../clients/CartClient";

const LOCAL_STORAGE_CART_ITEM_NAME = 'cart-id-ecommerce';

let CartInstance = (function() {

    let id = null;
    let user = null;
    let products = null;

    let init = async (cartId) => {
        
        // Create new cart
        if (cartId === 'undefined') {
            let response = await createCart();
            console.log(response);
            if (response) {
                id = response.data.cartId;
                localStorage.setItem(LOCAL_STORAGE_CART_ITEM_NAME, id);
            }
        }
        else {
            id = cartId;
        }

        // Load products
        if (id) {
            let response = await getCartById(id);
            if (response) {
                products = response.data.products;
            }
        }
    };

    let setUser = function(token) {
        user = token;
        setCartClient(id, user);
    };
    
    let getProducts = function() {
        return products;
    };

    let addProduct = function(product, amount) {
        addProductToCart(id, product, amount);
    };

    let removeProduct = function(product, amount) {
        removeProductFromCart(id, product, amount);
    };

    let getWeight = function() {
        let weight = 0;
        products.forEach((element) => {
            weight += element.weight * element.amount;
        });
        return weight;
    };

    let getWidth = function() {
        let width = 0;
        products.forEach((element) => {
            if (element.width > width) {
                width = element.width;
            }
        });
        return width;
    };

    let getHeight = function() {
        let height = 0;
        products.forEach((element) => {
            height += element.height * element.amount;
        });
        return height;
    };

    let getLength = function() {
        let length = 0;
        products.forEach((element) => {
            length += element.length * element.amount;
        });
        return length;
    };

    const cartId = localStorage.getItem(LOCAL_STORAGE_CART_ITEM_NAME);
    init(cartId);

    return {
        init: init,
        setUser: setUser,
        getProducts: getProducts,
        addProduct: addProduct,
        removeProduct: removeProduct,
        getWeight: getWeight,
        getWidth: getWidth,
        getHeight: getHeight,
        getLength: getLength
    }

})();

export default CartInstance;
