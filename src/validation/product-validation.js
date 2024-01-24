import Joi from "joi";

const addProductValidation = Joi.object({
  name: Joi.string().max(250).required(),
  description: Joi.string().max(400).required(),
  price: Joi.number(),
  stock: Joi.number(),
  price: Joi.number(),
  active: Joi.boolean(),
  old_price: Joi.number(),
  //   image_id: Joi.number(),
});

export { addProductValidation };
