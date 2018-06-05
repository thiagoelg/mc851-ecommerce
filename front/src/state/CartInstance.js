import {getShippingOptions} from "../clients/LogisticClient";
import {initCart, setCartClient, addProductToCart, removeProductFromCart, getCartById} from "../clients/CartClient";

const LOCAL_STORAGE_CART_ITEM_NAME = 'cart-id-ecommerce';

let CartInstance = (function() {

    let id = null;
    let user = null;
    let products = null;

    let getId = function() {
        return localStorage.getItem(LOCAL_STORAGE_CART_ITEM_NAME);
    }

    let init = function(response) {
        id = response.data.id;
        products = response.data.products;
        localStorage.setItem(LOCAL_STORAGE_CART_ITEM_NAME, id);
    };

    let setUser = function(token) {
        user = token;
        setCartClient(id, user);
    };
    
    let getProducts = async() => {
        let response = await getCartById(getId());
        return response.data.products;
    };


    let addProduct = async(product, amount) => {
        await addProductToCart(id, product, amount);
    };

    let removeProduct = async(product, amount) => {
        await removeProductFromCart(id, product, amount);
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
