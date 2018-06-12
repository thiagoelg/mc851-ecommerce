import bcrypt from "bcrypt-nodejs"
import mysql from "mysql2/promise"
import moment from "moment"

let pool;

export const connect = (callback) => {
    pool = mysql.createPool({
        host: 'db.localhost',
        user: 'root',
        password: 'P4ssword!',
        database: 'ecommerce'
    });
    callback()
};

export const createUser = async (user) => {
    if (!pool)
        throw 'Missing database connection!';

    const hash = bcrypt.hashSync(user.password);

    const [rows, fields] = await pool.query(
        `INSERT INTO user(email, password, clientId)
         VALUES (?, ?, ?)`,
        [user.email, hash, user.clientId]);

    return rows.insertId;
};

export const associateClientToUser = async (userId, clientId) => {
    if (!pool)
        throw 'Missing database connection!';

    const [rows, fields] = await pool.query(
        `UPDATE user SET clientId = ? WHERE id = ?`,
        [clientId, userId]);

    return rows && rows.affectedRows === 1;
};


export const getUserByEmail = async (email, done) => {
    if (!pool)
        throw 'Missing database connection!';

    const [rows, fields] = await pool.query(
        `SELECT id, email, password, clientId FROM user
         WHERE email = ?`, [email]);

    return rows[0];
};

export const getUserByClientId = async (clientId, done) => {
    if (!pool)
        throw 'Missing database connection!';

    const [rows, fields] = await pool.query(
        `SELECT id, email, password, clientId FROM user
         WHERE clientId = ?`, [clientId]);

    return rows[0];
};

export const changePassword = async (clientId, newPassword, done) => {
    if (!pool)
        throw 'Missing database connection!';

    const newHash = bcrypt.hashSync(newPassword);

    const [rows, fields] = await pool.query(
        `UPDATE user
         SET password = ?
         WHERE clientId = ?`, [newHash, clientId]);

    return rows && rows.affectedRows === 1;
};

export const createCart = async (clientId) => {
    if (!pool)
        throw 'Missing database connection!'

    const [rows, field] = await pool.query(
        `INSERT INTO cart(client_id, expires_at, expired)
         VALUES (?, ?, ?)`,
         [clientId, moment().add(30, 'minutes').toDate(), false])

    return rows.insertId
};

export const getCartById = async (cartId) => {
    if (!pool)
        throw 'Missing database connection!';

    const [rows, fields] = await pool.query(
        `SELECT id, client_id, expires_at FROM cart
         WHERE id = ?
         AND expired = false
         AND expires_at > now()`, [cartId]);

    return rows[0];
};

export const getCartByClientId = async (clientId) => {
    if (!pool)
        throw 'Missing database connection!';

    const [rows, fields] = await pool.query(
        `SELECT id, client_id, expires_at FROM cart
         WHERE client_id = ?
         AND expired = false
         AND expires_at > now()
         ORDER BY expires_at DESC`, [clientId]);

    return rows[0];
};

export const getExpiredCarts = async () => {
    if (!pool)
        throw 'Missing database connection!';

    const [rows, fields] = await pool.query(
        `SELECT id, client_id, expires_at, expired FROM cart
         WHERE expired = false
         AND expires_at < now()`);

    return rows;
};

export const expireCart = async (cartId) => {
    if (!pool)
        throw 'Missing database connection!'

    const [rows, fields] = await pool.query(
        `UPDATE cart SET expired = true 
         WHERE id = ?`, [cartId]
    )
};

export const associateClientIdToCart = async (cartId, clientId) => {
    if (!pool)
        throw 'Missing database connection!';

    const [rows, fields] = await pool.query(
        `UPDATE cart SET client_id = ?, expires_at = expires_at
         WHERE id = ?`, [clientId, cartId]
    )
};

export const getProductFromCart = async (cartId, productId) => {
    if (!pool)
        throw 'Missing database connection!';

    const [rows, fields] = await pool.query(
        `SELECT id, cart_id, product_id, amount FROM product_cart
         WHERE cart_id = ?
         AND product_id = ?`, [cartId, productId]);

    return rows[0];
};

export const getProductsFromCart = async (cartId) => {
    if (!pool)
        throw 'Missing database connection!';

    const [rows, fields] = await pool.query(
        `SELECT id, cart_id, product_id, amount FROM product_cart
         WHERE cart_id = ?
         AND amount > 0`, [cartId]);

    return rows;
};

export const addProduct = async (cartId, productId, amount) => {
    if (!pool)
        throw 'Missing database connection!'

    const [rows, field] = await pool.query(
        `INSERT INTO product_cart(cart_id, product_id, amount)
         VALUES (?, ?, ?)`,
         [cartId, productId, amount])
};

export const updateProduct = async (cartId, productId, amount) => {
    if (!pool)
        throw 'Missing database connection!'

    const [rows, field] = await pool.query(
        `UPDATE product_cart set amount = ?
         WHERE cart_id = ? AND product_id = ?`,
         [amount, cartId, productId])
};

export const createPurchase = async (cartId, clientId, status, price, shippingId, paymentId) => {
    if (!pool)
        throw 'Missing database connection!'

    const [rows, field] = await pool.query(
        `INSERT INTO purchase(cartId, clientId, status, price, shippingId, paymentId, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
         [cartId, clientId, status, price, shippingId, paymentId, moment().toDate()])

    return rows.insertId
};

export const getPurchaseById = async (purchaseId) => {
    if (!pool)
        throw 'Missing database connection!';

    const [rows, fields] = await pool.query(
        `SELECT p.id, p.cartId, p.clientId, p.status, p.price, p.createdAt, a.shippingCode, a.deliveryTime, a.type, a.identification, a.cep,
            a.street, a.number, a.neighborhood, a.city, a.state, a.complement,
            pay.boleto, pay.dueDate, pay.paymentCode, pay.bankTicketText as documentRep, pay.number, pay.brand, pay.instalments FROM purchase p
         JOIN shipping a ON a.id = p.shippingId
         JOIN payment pay ON pay.id = p.paymentId
         WHERE p.id = ?`, [purchaseId]);

    return rows[0];
};

export const getPurchasesByClientId = async (clientId) => {
    if (!pool)
        throw 'Missing database connection!';

    const [rows, fields] = await pool.query(
        `SELECT p.id, p.cartId, p.clientId, p.status, p.price, p.createdAt, a.shippingCode, a.deliveryTime, a.type, a.identification, a.cep,
            a.street, a.number, a.neighborhood, a.city, a.state, a.complement,
            pay.boleto, pay.dueDate, pay.paymentCode, pay.bankTicketText as documentRep, pay.number, pay.brand, pay.instalments FROM purchase p
         JOIN shipping a ON a.id = p.shippingId
         JOIN payment pay ON pay.id = p.paymentId
         WHERE p.clientId = ?`, [clientId]);

    return rows;
};

export const createShipping = async (address, shippingCode) => {
    if (!pool)
        throw 'Missing database connection!'

    const [rows, field] = await pool.query(
        `INSERT INTO shipping(cep, identification, street, number, neighborhood, city, state, complement, deliveryTime, type, shippingCode)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
         [address.cep, address.identification, address.street, address.number, address.neighborhood, address.city, 
            address.state, address.complement, address.deliveryTime, address.type, shippingCode])

    return rows.insertId
};

export const createPayment = async (payment, paymentCode) => {
    if (!pool)
        throw 'Missing database connection!'

    const [rows, field] = await pool.query(
        `INSERT INTO payment(name, number, expiryMonth, expiryYear, cvc, brand, instalments, cpf, bankTicketText, paymentCode, boleto, dueDate)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
         [payment.name, payment.number, payment.expiryMonth, payment.expiryYear, payment.cvc, payment.brand, payment.instalments, payment.cpf, 
            payment.bankTicketText, paymentCode, payment.boleto, payment.dueDate])

    return rows.insertId
};

export default {
    connect,
    createUser,
    associateClientToUser, 
    getUserByEmail, 
    getUserByClientId, 
    changePassword, 
    createCart, 
    getCartByClientId, 
    getCartById, 
    getExpiredCarts,
    expireCart,
    associateClientIdToCart,
    getProductsFromCart,
    getProductFromCart,
    addProduct, 
    updateProduct,
    createPurchase,
    getPurchaseById,
    getPurchasesByClientId,
    createShipping,
    createPayment
};