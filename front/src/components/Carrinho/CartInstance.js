import {getShippingOptions} from "../../clients/LogisticClient";

class CartInstance {

    /**
     * Builder.
     * 
     * Cria uma instância de carrinho, armazena nos cookies.
     * 
     * @param {user, products, timeout} params 
     */
    constructor({id, user, products, timeout}) {
        this.id = id;
        this.user = user;
        this.products = products;
        this.timeout = timeout;
        this.created = Date.now();
    }

    isExpired() {
        if (Date.now() > this.created + this.timeout) {
            return TRUE;
        }
    }

    refresh() {
        this.created = Date.now();
    }

    setUser(user) {
        this.user = user;
    }
    
    getUser() {
        return this.user;
    }
    
    getProducts() {
        return this.products;
    }

    addProduct(product, quantity) {
        this.products[] = {
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