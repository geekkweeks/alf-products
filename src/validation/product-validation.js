import Joi from "joi";

const addProductValidation = Joi.object({
  name: Joi.string().max(250).required(),
  description: Joi.string().max(400).required(),
  price: Joi.number().required(),
  stock: Joi.number(),
  price: Joi.number(),
  active: Joi.boolean(),
});

export { addProductValidation };
