import ProductClient from '../service/produtos_client'

export const getProducts = async (params) => {

    const response = await ProductClient.getProducts(params)

    if (!response || response.status != 200) {
        console.error("getProducts error - status: " + response.status)
        return []
    }

    return response.data
}

export const getCategories = async (params) => {
    const response = await ProductClient.getCategories(params)

    if (!response || response.status != 200) {
        console.error("getCategories error - status: " + response.status)
        return []
    }

    return response.data
}

export const getCategory = async (id) => {
    const response = await ProductClient.getCategory(id)

    if (!response || response.status != 200) {
        console.error("getCategory error - status: " + response.status)
        return {}
    }

    return response.data
}

export const getProduct = async (id) => {
    const response = await ProductClient.getProduct(id)

    if (!response || response.status != 200) {
        console.error("getProduct error - status: " + response.status)
        return {}
    }

    return response.data
}

export const reserveProduct = async (id, amount) => {
    const response = await ProductClient.reserveProduct(id, amount)

    if (!response || response.status != 200) {
        console.error("reserveProduct error - status: " + response.status)
        return {}
    }

    return response.data
}


export const releaseProduct = async (id, amount) => {
    const response = await ProductClient.releaseProduct(id, amount)

    if (!response || response.status != 200) {
        console.error("releaseProduct error - status: " + response.status)
        return {}
    }
    
    return response.data
}

export default {
    getProducts,
    getProduct,
    getCategories,
    getCategory,
    reserveProduct,
    releaseProduct
}