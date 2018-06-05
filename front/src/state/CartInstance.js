import {getShippingOptions} from "../../clients/LogisticClient";

const LOCAL_STORAGE_ITEM_NAME = 'cart-id-ecommerce';

let cartInstance = (function() {

    let id = null;
    let user = null;
    let products = null;

    let setUser = function(u) {
        user = u;
    };
    
    let getUser = function() {
        return user;
    };
    
    let getProducts = function() {
        return products;
    }

    let addProduct = function(product, quantity) {
        products[] = {
            item: product,
            quantity: quantity
        };
    }

    removeProduct(product) {
        this.products.forEach((element, index, array) => {
            if (element.item.id == product.id) {
                this.products = this.products.splice(index, 1);
            }
        });
    }

    updateQuantity(product, quantity) {
        this.products.forEach((element, index, array) => {
            if (element.item.id == product.id) {
                this.products[index].quantity = quantity;
            }
        });
    }

    getWeight() {
        let weight = 0;
        this.products.forEach((element) => {
            weight += element.item.weight * quantity;
        })
        return weight;
    }

    getWidth() {
        let width = this.products[0].item.width;
        this.products.forEach((element) => {
            if (element.item.width > width) {
                width = element.item.width;
            }
        })
        return width;
    }

    getHeight() {
        let height = 0;
        this.products.forEach((element) => {
            height += element.item.height * quantity;
        })
        return height;
    }

    getLength() {
        let length = 0;
        this.products.forEach((element) => {
            length += element.item.length * quantity;
        })
        return length;
    }


}