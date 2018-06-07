import ProductClient from '../service/produtos_client'
import Database from "../database/database"
import AuthTokenGenerator from "../utils/AuthTokenGenerator"

export const getPurchases = async (token) => {
    const user = AuthTokenGenerator.verify(token);
    //TODO
};

export const getPurchaseByID = async (token, purchaseId) => {
    const user = AuthTokenGenerator.verify(token);
    //TODO
};

export const getPurchaseTracking = async (token, purchaseId) => {
    const user = AuthTokenGenerator.verify(token);
    //TODO
};


export default {
    getPurchases,
    getPurchaseByID,
    getPurchaseTracking
}