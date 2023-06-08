const express = require('express');

const products = require('./resources/products/products.router');

const app = express();

app.use('/api/v1/products', products);
app.use(express.json());

app.listen(9000, () => console.log('Port 9000 on fire'));
