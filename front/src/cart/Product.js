class Product {
    constructor(product) {
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.brand = product.brand;
        this.tags = product.tags;
        this.categoryId = product.categoryId;
        this.imageUrl = product.imageUrl;
        this.weight = product.weight;
        this.length = product.length;
        this.width = product.width;
        this.height = product.height;
        this.amount = product.amount;
    }
}

export default Product;