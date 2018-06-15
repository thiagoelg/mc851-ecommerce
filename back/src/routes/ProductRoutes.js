import express from 'express'

import ProductController from '../controller/ProductController'
import ProdutosClient from '../service/produtos_client'

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

    try {
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
            page: req.query.page || 1,
            highlight: req.query.highlight || false,
        };

        if (req.query.brands) {
            params.brand = req.query.brands
        }

        if (req.query.category_id) {
            params.categoryId = req.query.category_id
        }

        if (req.query.max_price) {
            params.max_price = req.query.max_price
        }

        if (req.query.min_price) {
            params.min_price = req.query.min_price
        }

        if (req.query.name) {
            params.name = req.query.name
        }

        if (req.query.parent_product) {
            params.parent_product = req.query.parent_product
        }

        let products = await ProductController.getProducts(params);

        let filterProducts = []
        let addProduct = true

        for (let p of products) {
            if ("highlight" in params) {
                var isTrueSet = (params.highlight == 'true');
                if (isTrueSet !== p.highlight) {
                    addProduct = false
                }
            }

            if (addProduct && "brand" in params) {
                if (params.brand !== p.brand) {
                    addProduct = false
                }
            }

            if (addProduct && "categoryId" in params && params.categoryId) {
                const categories = params.categoryId.split(",");

                if (!categories.includes(p.categoryId)) {
                    addProduct = false
                }
            }

            if (addProduct && "max_price" in params) {
                if (params.max_price < p.price) {
                    addProduct = false
                }
            }

            if (addProduct && "min_price" in params) {
                if (params.min_price > p.price) {
                    addProduct = false
                }
            }

            if (addProduct && "name" in params) {
                if (params.name !== p.name) {
                    addProduct = false
                }
            }

            if (addProduct && "parent_product" in params) {
                if (params.parent_product !== p.parent_product) {
                    addProduct = false
                }
            }

            if (addProduct) {
                filterProducts.push(p)
            }
            addProduct = true
        }

        return res.json(filterProducts)
    } catch (e) {
        next(e)
    }
});

router.get('/search', async (req, res, next) => {

    try {
        let params = {
            search: req.query.search
        };

        let products = await ProductController.getProductsByFullSearch(params);

        let filterProducts = []
        let addProduct = true

        for (let p of products) {
            if (p.groupId !== ProdutosClient.GROUP_ID) {
                addProduct = false
            }

            if (addProduct) {
                filterProducts.push(p)
            }
            addProduct = true
        }

        return res.json(filterProducts)
    } catch (e) {
        next(e)
    }
});

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

    try {
        if (!req.params.id || !req.params.amount) {
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

    try {
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