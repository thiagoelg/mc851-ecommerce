import express from 'express'

import ProductClient from '../service/produtos_client'

const router = express.Router()

router.get('/', async (req, res, next) => {

    try {
        let params = {
            page: req.query.page                        || 1,
            highlight: req.query.highlight              || true,
        }
        
        if (req.params.brand) {
            params.brand = req.params.brand
        }
    
        if (req.params.category_id) {
            params.category_id = req.params.category_id
        }
    
        if (req.params.max_price) {
            params.max_price = req.params.max_price
        }
    
        if (req.params.min_price) {
            params.min_price = req.params.min_price
        }
    
        if (req.params.name) {
            params.name = req.params.name
        }
    
        if (req.params.parent_product) {
            params.parent_product = req.params.parent_product
        }
    
        let products = await ProductClient.getProducts(params)
    
        return res.json(products)
    } catch (e) {
        next(e)
    }
})

export default router