import bcrypt from "bcrypt-nodejs"
import ClientClient from "../service/cliente_client"
import Database from "../database/database"
import AuthTokenGenerator from "../utils/AuthTokenGenerator"

export const register = async (params) => {

    let userId;

    try {
        userId = await Database.createUser({email: params.email, password: params.password});
    } catch (e) {
        if (e.errno === 1062) { // duplicate entry
            return {
                status: 400
            }
        }
        throw e;
    }

    const response = await ClientClient.register({
        name: params.name,
        email: params.email,
        birthDate: params.birthDate,
        gender: params.gender,
        cep: params.cep,
        address: params.address, // FIXME
        telephone: params.telephone,
        cpf: params.cpf,
        password: "systemgen",
        samePass: "systemgen"
    });

    if (!response || response.status !== 200) {
        console.error("register error - status: ", response.status);
        return;
    }

    if (response.status === 200) {
        await Database.associateClientToUser(userId, response.data);
    }

    const token = AuthTokenGenerator.create({id: response.data, name: params.name});
    return {
        status: response.status,
        data: token
    };
};

export const login = async (params) => {

    const user = await Database.getUserByEmail(params.email);

    if (!user) {
        return {
            status: 400
        }
    }

    const verified = bcrypt.compareSync(params.password, user.password);

    if (!verified) {
        return {
            status: 401
        }
    }


    const response = await ClientClient.getClient(user.clientId);

    if (!response || response.status !== 200) {
        console.error("login error - status: " + response.status);
        return {
            status: response.status
        };
    }

    const token = AuthTokenGenerator.create({id: user.clientId, name: response.data.name});
    return {
        status: response.status,
        data: token
    };
};

export const getClient = async (token) => {

    const decoded = AuthTokenGenerator.verify(token);

    if(!decoded) {
        return {
            status: 401
        }
    }

    const response = await ClientClient.getClient(decoded.cid);

    if (!response || response.status !== 200) {
        console.error("getClient error");
        return 0
    }

    return {
        status: response.status,
        data: {
            name: response.data.name,
            email: response.data.email,
            birthDate: response.data.birthDate,
            gender: response.data.gender,
            cep: response.data.cep,
            address: response.data.address, // FIXME
            telephone: response.data.telephone,
            cpf: response.data.cpf,
        }
    };
};

export const getClients = async () => {

    const response = await ClientClient.getClients()

    if (!response || response.status !== 200) {
        console.error("getClients error")
        return 0
    }

    return response.data
};

export const updateUser = async (id, info) => {

    const response = await ClientClient.updateUser(id, info)

    if (!response || response.status !== 200) {
        console.error("updateUser error")
        return 0
    }

    return response.data
};

export const changePassword = async (id, info) => {

    const response = await ClientClient.changePassword(id, info)

    if (!response || response.status !== 200) {
        console.error("changePassword error")
        return 0
    }

    return response.data
};

export const deleteUser = async (id, info) => {

    const response = await ClientClient.deleteUser(id, info)

    if (!response || response.status !== 200) {
        console.error("deleteUser error")
        return 0
    }

    return response.data
};

export default {
    register,
    getClient,
    updateUser,
    changePassword,
    deleteUser,
    login
}
