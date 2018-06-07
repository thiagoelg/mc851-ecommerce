CREATE TABLE `purchase` (
    id int AUTO_INCREMENT,
    cartId int NOT NULL REFERENCES cart(id),
    clientId VARCHAR(255),
    status int NOT NULL,
    price int,
    shippingCode VARCHAR(255),
    paymentCode VARCHAR(255),
    bankTicketText TEXT,
    createdAt TIMESTAMP

    PRIMARY KEY(id)
);