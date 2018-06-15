import ProductClient from '../service/produtos_client'

export const getProducts = async (params) => {

    const response = await ProductClient.getProducts(params);

    if (!response) {
        console.error("getProducts Error");
        return []
    }
    else if(response.status !== 200) {
        console.error("getProducts Error with status " + response.status);
        return {
            status: response.status,
            data: response.data
        };
    }

    return response.data
};

export const getProductsByFullSearch = async (params) => {

    const response = await ProductClient.getProductsByFullSearch(params);

    if (!response) {
        console.error("getProductsByFullSearch Error");
        return []
    }
    else if(response.status !== 200) {
        console.error("getProductsByFullSearch Error with status " + response.status);
        return {
            status: response.status,
            data: response.data
        };
    }

    return response.data
};

export const getCategories = async (params) => {
    const response = await ProductClient.getCategories(params);

    if (!response) {
        console.error("getCategories Error");
        return []
    }
    else if(response.status !== 200) {
        console.error("getCategories Error with status " + response.status);
        return {
            status: response.status,
            data: response.data
        };
    }

    return response.data
};

export const getCategory = async (id) => {
    const response = await ProductClient.getCategory(id);

    if (!response) {
        console.error("getCategory Error");
        return {}
    }
    else if(response.status !== 200) {
        console.error("getCategory Error with status " + response.status);
        return {
            status: response.status,
            data: response.data
        };
    }

    return response.data
};

export const getProduct = async (id) => {
    const response = await ProductClient.getProduct(id)

    if (!response) {
        console.error("getProduct Error");
        return {}
    }
    else if(response.status !== 200) {
        console.error("getProduct Error with status " + response.status);
        return {
            status: response.status,
            data: response.data
        };
    }

    return response.data
};

export const reserveProduct = async (id, amount) => {
    const response = await ProductClient.reserveProduct(id, amount);

    if (!response) {
        console.error("reserveProduct Error");
        return {}
    }
    else if(response.status !== 200) {
        console.error("reserveProduct Error with status " + response.status);
        return {
            status: response.status,
            data: response.data
        };
    }

    return response.data
};


export const releaseProduct = async (id, amount) => {
    const response = await ProductClient.releaseProduct(id, amount);
  
    if (!response) {
        console.error("releaseProduct Error");
        return {}
    }
    else if(response.status !== 200) {
        console.error("releaseProduct Error with status " + response.status);
        return {
            status: response.status,
            data: response.data
        };
    }
    
    return response.data
};

export default {
    getProducts,
    getProductsByFullSearch,
    getProduct,
    getCategories,
    getCategory,
    reserveProduct,
    releaseProduct
}