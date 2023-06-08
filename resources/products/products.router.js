const express = require('express');

const {
  addOneProduct,
  getOneProduct,
  getProducts,
  updateOneProduct,
  deleteOneProduct,
} = require('./products.controller');
const verifyPayload = require('../../middlewares/verifyPayload');

const router = express.Router();

router.route('').get(getProducts).post(verifyPayload, addOneProduct);

router
  .route('/:id')
  .get(getOneProduct)
  .put(updateOneProduct)
  .delete(deleteOneProduct);

module.exports = router;
