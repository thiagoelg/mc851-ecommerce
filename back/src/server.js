import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { CronJob } from "cron";

import ProductRoutes from './routes/ProductRoutes'
import CreditRoutes from './routes/CreditRoutes'
import LogisticRoutes from './routes/LogisticRoutes'
import FixtureRoutes from './routes/FixtureRoutes'
import ClientRoutes from "./routes/ClientRoutes";
import AddressRoutes from "./routes/AddressRoutes"
import CartRoutes from './routes/CartRoutes'
import PurchaseRoutes from './routes/PurchaseRoutes'
import SacRoutes from "./routes/SacRoutes"
import PaymentRoutes from "./routes/PaymentRoutes"
import Database from "./database/database";
import ProductController from "./controller/ProductController";
import CartController from './controller/CartController'

const app = express(),
    port = process.env.PORT || 3001;

app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Expose-Headers', 'X-Requested-With,content-type,X-Auth-Token');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
    res.send('pong\n')
});

app.use('/products', ProductRoutes);
app.use('/credit', CreditRoutes);
app.use('/logistic', LogisticRoutes);
app.use('/user', ClientRoutes);
app.use('/address', AddressRoutes);
app.use('/cart', CartRoutes)
app.use('/purchase', PurchaseRoutes)
app.use('/sac', SacRoutes);
app.use('/payment', PaymentRoutes);
app.use('/purchase', PurchaseRotues)
//app.use('/fixtures', FixtureRoutes); // one time use only

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err)
});

// error handler
app.use((err, req, res, next) => {
    if(err.status !== 404) {
        console.error(err.stack)
    }
    res.sendStatus(err.status || 500)
});

app.listen(port, () => {
    console.log("Listening on port " + port)
});

Database.connect(() => {
    console.log('Database initialized!')
});

// job to release products from expired carts
const job = new CronJob('*/5 * * * *', () => {
        CartController.handleExpiredCarts()
    },
    () => {},
    true, // true,
    'America/Sao_Paulo'
);