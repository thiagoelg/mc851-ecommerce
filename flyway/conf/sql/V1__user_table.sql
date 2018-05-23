CREATE TABLE `user` (
    id int AUTO_INCREMENT,
    email VARCHAR(320) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    clientId VARCHAR(255),

    PRIMARY KEY(id)
);