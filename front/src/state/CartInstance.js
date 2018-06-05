import {getShippingOptions} from "../clients/LogisticClient";
import {initCart, setCartClient, addProductToCart, removeProductFromCart} from "../clients/CartClient";

const LOCAL_STORAGE_CART_ITEM_NAME = 'cart-id-ecommerce';

let CartInstance = (function() {

    let id = null;
    let user = null;
    let products = null;

    let getId = function() {
        return localStorage.getItem(LOCAL_STORAGE_CART_ITEM_NAME);
    }

    let init = function(reponse) {
        id = reponse.data.id;
        products = reponse.data.products;
        localStorage.setItem(LOCAL_STORAGE_CART_ITEM_NAME, id);
    };

    let setUser = function(token) {
        user = token;
        setCartClient(id, user);
    };
    
    let getProducts = function() {
        return products;
    };

    let refresh = function() {
        init(id);
    }

    let addProduct = async(product, amount) => {
        await addProductToCart(id, product, amount);
        refresh();
    };

    let removeProduct = async(product, amount) => {
        await removeProductFromCart(id, product, amount);
        refresh();
    };

    const cartId = localStorage.getItem(LOCAL_STORAGE_CART_ITEM_NAME);
    initCart(cartId).then(response => { init(response) });

    return {
        init: init,
        getId: getId,
        setUser: setUser,
        getProducts: getProducts,
        addProduct: addProduct,
        removeProduct: removeProduct,
    }

})();

export default CartInstance;
