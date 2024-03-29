import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import {CronJob} from "cron";

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
import CartController from './controller/CartController'
import PurchaseController from "./controller/PurchaseController";

const app = express(),
    port = process.env.PORT || 3001;

app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Expose-Headers', 'X-Requested-With,content-type,X-Auth-Token');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/ping', (req, res) => {
    res.send('pong\n')
});

app.use('/products', ProductRoutes);
app.use('/credit', CreditRoutes);
app.use('/logistic', LogisticRoutes);
app.use('/user', ClientRoutes);
app.use('/address', AddressRoutes);
app.use('/cart', CartRoutes);
app.use('/purchase', PurchaseRoutes);
app.use('/sac', SacRoutes);
app.use('/payment', PaymentRoutes);
//app.use('/fixtures', FixtureRoutes); // one time use only

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err)
});

// error handler
app.use((err, req, res, next) => {
    if (err.status !== 404) {
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
const jobCartExpiration = new CronJob('*/5 * * * *', async () => {
        console.log("[cart expiration] about to run cart expiration");
        await CartController.handleExpiredCarts()
    },
    () => {
    },
    true, // true,
    'America/Sao_Paulo'
);

// job to update tracking
const jobTrackingChange = new CronJob('*/5 * * * *', async () => {
        console.log("[tracking change] about to run tracking change");
        await PurchaseController.handleTrackingChange()
    },
    () => {
    },
    true, // true,
    'America/Sao_Paulo'
);

// job to update payment
const jobPaymentChange = new CronJob('*/5 * * * *', async () => {
        console.log("[payment change] about to run payment change");
        await PurchaseController.handlePaymentChange()
    },
    () => {
    },
    true, // true,
    'America/Sao_Paulo'
);

jobCartExpiration.start();
jobTrackingChange.start();
jobPaymentChange.start();