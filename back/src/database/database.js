import bcrypt from "bcrypt-nodejs"

const mysql = require('mysql2/promise');
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

export default {connect, createUser, associateClientToUser, getUserByEmail, getUserByClientId, changePassword};