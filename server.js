const express = require('express');
const Joi = require('joi');

const { writeData, readData, fetchData } = require('./utils/files');

const app = express();
app.use((req, res, next) => {
  console.log('M1');

  // processing ...
  console.log('CALL VIA METHOD : ', req.method);
  console.log('req.name inside M1  ', req.name);
  req.name = "kikoo je 'm'amuse";
  next();
});
app.use((req, res, next) => {
  console.log('M2');

  // processing ...
  console.log('M2 : req.body = ', req.body);
  next();
});
app.use(express.json()); // req.body XX ==> req.body populé

app.use((req, res, next) => {
  console.log('M4');

  console.log('M4 : req.body = ', req.body);

  next();
});

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
  console.log('is name ? ', req.name);

  const totalProducts = products.length;

  const schema = Joi.object({
    title: Joi.string().min(10).max(100).required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string().required(),
    title: Joi.string().required(),
    rating: Joi.required({
      rate: Joi.number().required(),
      count: Joi.number().required(),
    }),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).send({
      ok: false,
      msg: result.error.details[0].message,
    });
  }

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
