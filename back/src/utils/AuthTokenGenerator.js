const jwt = require('jsonwebtoken');

const secret = '872174d0-ab10-4b1e-9a74-40a4f27c532f';
const expirationTime = (Math.floor(Date.now() / 1000) + (60 * 60)) * 8; // 8 hours

export const create = (client) => {
    return jwt.sign({
        exp: expirationTime,
        name: client.name,
        cid: client.id,
        email: client.email,
        cpf: client.cpf
    }, secret);
};

export const verify = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (e) {
        return false;
    }
};

export default {create, verify}