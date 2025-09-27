const Joi = require("joi");

const createProductSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow("", null),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).default(0),
  image_url: Joi.string().uri().allow("", null),
});

const updateProductSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow("", null),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().min(0).default(0),
  image_url: Joi.string().uri().allow("", null),
});

const deleteProductSchema = Joi.object({
  id: Joi.number().integer().required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
};
