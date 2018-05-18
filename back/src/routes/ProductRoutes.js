import express from 'express'

import ProductController from '../controller/ProductController'

const router = express.Router()

router.get('/categories/', async (req, res, next) => {

    try {
        let params = {
            page: req.query.page || 1,
        }

        if (req.params.name) {
            params.name = req.params.name
        }
        if (req.params.parent_category) {
            params.parent_category = req.params.parent_category
        }

        let categories = await ProductController.getCategories(params)
        return res.json(categories)
    } catch (e) {
        next(e)
    }
})

router.get('/categories/:id', async (req, res, next) => {

    try{
        let id = req.params.id
        if (!id) {
            res.sendStatus(400)
            return
        }

        let category = await ProductController.getCategory(id)
        return res.json(category)
    } catch (e) {
        next(e)
    }
})

router.get('/', async (req, res, next) => {

    try {
        let params = {
            page: req.query.page                        || 1,
            highlight: req.query.highlight              || false,
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

        let products = await ProductController.getProducts(params)
    
        return res.json(products)
    } catch (e) {
        next(e)
    }
})

router.get('/:id', async (req, res, next) => {

    try {
        let id = req.params.id

        if (!id) {
            res.sendStatus(400)
            return
        }

        let product = await ProductController.getProduct(id)
        return res.json(product)
    } catch (e) {
        next(e)
    }
})

router.get('/reserve/:id', async (req, res, next) => {

    try{
        if (!req.params.id  || !req.params.amount) {
            res.sendStatus(400)
            return
        }

        let response = await ProductController.reserveProduct(id, amount)
        return res.json(response)
    } catch (e) {
        next(e)
    }
})

router.get('/release/:id', async (req, res, next) => {
    
    try{
        if (!req.params.id || !req.params.amount) {
            res.sendStatus(400)
            return
        }

        let response = await ProductController.releaseProduct(id, amount)
        return res.json(response)
    } catch (e) {
        next(e)
    }
})

export default router