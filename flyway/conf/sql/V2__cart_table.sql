CREATE TABLE `cart` (
    id int AUTO_INCREMENT,
    client_id VARCHAR(255) NOT NULL,
    expired BOOLEAN NOT NULL,
    expires_at TIMESTAMP NOT NULL,

    PRIMARY KEY(id)
);

CREATE TABLE `product_cart` (
    id int AUTO_INCREMENT,
    cart_id int NOT NULL REFERENCES cart(id),
    product_id VARCHAR(255) NOT NULL,
    amount int NOT NULL,

    PRIMARY KEY(id)
);