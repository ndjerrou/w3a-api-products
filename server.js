const express = require('express');

const { writeData, readData, fetchData } = require('./utils/files');

const app = express();
app.use(express.json());

// API Restfull
app.get('/api/v1/products', (req, res) => {
  const products = readData();

  res.send(products);
});

app.get('/api/v1/products/:id', (req, res) => {
  const products = readData();

  const { id } = req.params;

  const product = products.find((product) => {
    return product.id === +id;
  });

  console.log(product);

  res.send(product);
});

app.post('/api/v1/products', (req, res) => {
  const products = readData();

  const totalProducts = products.length;

  const product = { ...req.body, id: totalProducts + 1 };

  products.push(product);

  writeData(products);

  res.status(201).send({ ok: true, data: product });
});

app.put('/api/v1/products/:id', (req, res) => {
  const products = readData();

  const { id } = req.params;

  const product = products.find((product) => product.id === +id);

  if (!product)
    return res.status(404).send({ ok: false, msg: 'Invalid id provided' });

  for (let key in req.body) {
    product[key] = req.body[key];
  }

  const idx = products.findIndex((product) => product.id === +id);

  products.splice(idx, 1, product);

  writeData(products);

  res.send({ ok: true, data: product });
});

app.delete('/api/v1/products/:id', (req, res) => {
  const products = readData();

  const { id } = req.params;

  const product = products.find((product) => product.id === +id);

  if (!product)
    return res.status(404).send({ ok: false, msg: 'Invalid id provided' });

  const idx = products.findIndex((product) => product.id === +id);

  const deletedProduct = products.splice(idx, 1);

  writeData(products);

  res.send({ ok: true, data: deletedProduct });
});

// 3 endpoints missing...
app.listen(9000, () => console.log('Port 9000 on fire'));
