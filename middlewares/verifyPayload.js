const Joi = require('joi');

module.exports = (req, res, next) => {
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

  if (result.error)
    return res.status(400).send({ ok: false, msg: 'Invalid parameters sent' });

  next();
};
