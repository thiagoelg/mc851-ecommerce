import express from 'express'

import ProductsFixture from '../fixture/produtos_fixture'

const router = express.Router();

router.get('/products', async (req, res, next) => {
    console.log("About to insert products");
    try {
        await ProductsFixture.createEletrodomesticos();
        await ProductsFixture.createMobilia();
        await ProductsFixture.createEletronicos();
        await ProductsFixture.createJardim();
        await ProductsFixture.createLivros();
        await ProductsFixture.createIluminacao();
        res.send(200);
    } catch (e) {
        next(e)
    }
});

export default router