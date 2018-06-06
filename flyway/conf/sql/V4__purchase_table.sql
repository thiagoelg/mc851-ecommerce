CREATE TABLE `purchase` (
    id int AUTO_INCREMENT,
    cartId int NOT NULL REFERENCES cart(id),
    clientId VARCHAR(255),
    status int NOT NULL,
    trackingCode VARCHAR(255),
    paymentCode VARCHAR(255),
    createdTime TIMESTAMP

    PRIMARY KEY(id)
);