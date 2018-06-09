CREATE TABLE `shipping` (
    id int AUTO_INCREMENT,
    cep VARCHAR(20),
    identification VARCHAR(255),
    street VARCHAR(255),
    `number` VARCHAR(10),
    neighborhood VARCHAR(255),
    city VARCHAR(255),
    `state` VARCHAR(255),
    complement VARCHAR(255),
    deliveryTime int,
    `type` VARCHAR(56),
    shippingCode VARCHAR(255),

    PRIMARY KEY(id)
);

CREATE TABLE `payment` (
    id int AUTO_INCREMENT,
    name VARCHAR(255),
    `number` VARCHAR(10),
    expiryMonth VARCHAR(4),
    expiryYear VARCHAR(4),
    cvc VARCHAR(5),
    brand VARCHAR(255),
    instalments VARCHAR(5),
    cpf VARCHAR(20),
    bankTicketText TEXT,
    paymentCode VARCHAR(255),
    boleto BOOLEAN,
    dueDate TIMESTAMP,

    PRIMARY KEY(id)
);

ALTER TABLE `purchase` ADD COLUMN shippingId int REFERENCES shipping(id);
ALTER TABLE `purchase` ADD COLUMN paymentId int REFERENCES payment(id);
ALTER TABLE `purchase` DROP COLUMN shippingCode;
ALTER TABLE `purchase` DROP COLUMN paymentCode;


name, number, expiryMonth, expiryYear, cvc, brand, instalments, cpf, bankTicketText, paymentCode, boleto, dueDate