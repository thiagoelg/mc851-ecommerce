import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

import ProductRoutes from './routes/ProductRoutes'
import CreditRoutes from './routes/CreditRoutes'

var app  = express(),
    port = process.env.PORT || 3001;

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/ping', (req, res) => {
    res.send('pong\n')
})

app.use('/products', ProductRoutes)
app.use('/credit', CreditRoutes)

app.listen(port, () => {
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
