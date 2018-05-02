import express from "express"
import bodyParser from "body-parser"
import axios from "axios"

var app  = express(),
    port = process.env.PORT || 3001,
    produtosURL = "https://ftt-catalog.herokuapp.com";

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/ping', (req, res) => {
    res.send('pong\n')
})

app.get('/products', (req, res) => {

    let page           = req.query.page           || 1
    let highlight      = req.query.highlight      || false
    let brand          = req.query.brand          || ""
    let category_id    = req.query.category_id    || ""
    let max_price      = req.query.max_price      || ""
    let min_price      = req.query.min_price      || ""
    let name           = req.query.name           || ""
    let parent_product = req.query.parent_product || ""

    axios.get(produtosURL + "/products", {
        params: {
          page: 1 //TODO: {page}
        }
    })  .then(response => {
            res.send(response.data)
        })
        .catch(error => {
            console.error(error)
        })
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
