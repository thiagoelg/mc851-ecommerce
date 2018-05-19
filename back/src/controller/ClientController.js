import ClientClient from '../service/cliente_client'

export const register = async (info) => {

    const response = await ClientClient.register(info)

    if (!response || response.status != 200) {
        console.error("register error")
        return -1 //TODO: post return value
    }

    return response.data
}

export const getClients = async () => {

    const response = await ClientClient.getClients()

    if (!response || response.status != 200) {
        console.error("getClients error")
        return 0
    }

    return response.data
}

export const getClient = async (id) => {

    const response = await ClientClient.getClient(id)

    if (!response || response.status != 200) {
        console.error("getClient error")
        return 0
    }

    return response.data
}

export const updateUser = async (id, info) => {

    const response = await ClientClient.updateUser(id, info)

    if (!response || response.status != 200) {
        console.error("updateUser error")
        return 0
    }

    return response.data
}

export const changePassword = async (id, info) => {

    const response = await ClientClient.changePassword(id, info)

    if (!response || response.status != 200) {
        console.error("changePassword error")
        return 0
    }

    return response.data
}

export const deleteUser = async (id) => {

    const response = await ClientClient.deleteUser(id)

    if (!response || response.status != 200) {
        console.error("deleteUser error")
        return 0
    }

    return response.data
}

export const login = async (params) => {

    const response = await ClientClient.login(id)

    if (!response || response.status != 200) {
        console.error("login error")
        return 0
    }

    return response.data
}

export default {
    register,
    getClients,
    getClient,
    updateUser,
    changePassword,
    deleteUser,
    login
}