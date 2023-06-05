const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();

function writeData() {
  axios('https://fakestoreapi.com/products').then(({ data }) => {
    const productsPath = path.join(__dirname, 'data', 'products.json');
    try {
      fs.writeFileSync(productsPath, JSON.stringify(data));
    } catch (err) {
      console.error('Error writing file : ', err.message);
    }
  });
}

function readData() {
  const productsPath = path.join(__dirname, 'data', 'products.json');
  try {
    const products = fs.readFileSync(productsPath, 'utf-8');

    return JSON.parse(products);
  } catch (err) {
    console.error('Error reading file : ', err.message);
  }
}

// writeData();

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

app.listen(9000, () => console.log('Port 9000 on fire'));
