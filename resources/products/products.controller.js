const { writeData, readData, fetchData } = require('../../utils/files');

module.exports = {
  addOneProduct(req, res) {
    const products = readData();

    const product = { ...req.body, id: products.length + 1 };

    products.push(product);

    writeData(products);

    res.status(201).send({ ok: true, data: product });
  },
  getProducts(req, res) {
    const products = readData();

    res.send(products);
  },
  getOneProduct(req, res) {
    const products = readData();

    const { id } = req.params;

    const product = products.find((product) => product.id === +id);

    if (!product)
      return res.status(404).send({ ok: false, msg: 'Invalid id provided' });

    res.send(product);
  },
  updateOneProduct(req, res) {
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
  },
  deleteOneProduct(req, res) {
    const products = readData();

    const { id } = req.params;

    const product = products.find((product) => product.id === +id);

    if (!product)
      return res.status(404).send({ ok: false, msg: 'Invalid id provided' });

    const idx = products.findIndex((product) => product.id === +id);

    const deletedProduct = products.splice(idx, 1);

    writeData(products);

    res.send({ ok: true, data: deletedProduct });
  },
};
