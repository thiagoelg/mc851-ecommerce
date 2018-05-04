import express from "express"
import bodyParser from "body-parser"
import ProductClient from "./service/produtos_client"

var app  = express(),
    port = process.env.PORT || 3001;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/ping', (req, res) => {
    res.send('pong\n')
})

app.get('/products', async (req, res) => {

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
})

app.listen(port,() => {
    console.log("Listening on port " + port)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use((err, req, res, next) => {
    if(err.status != 404) {
        console.error(err.stack)
    }
    res.sendStatus(err.status || 500)
})
