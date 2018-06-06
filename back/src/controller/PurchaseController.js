import ProductClient from '../service/produtos_client'
import Database from "../database/database"
import AuthTokenGenerator from "../utils/AuthTokenGenerator"
import LogisticaClient from '../service/logistica_client'

export const getPurchases = async (token) => {

}

export const getPurchaseById = async (token, purchaseId) => {
    
}

export const getPurchaseTrackingById = async (token, purchaseId) => {
    
}

export default {
    getPurchaseById,
    getPurchaseTrackingById,
    getPurchases,
}