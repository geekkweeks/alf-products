import Joi from "joi";

const registerUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
  name: Joi.string().max(100).required(),
  role: Joi.number().required(),
});

const loginUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

// search user by username or name
const getUserValidation = Joi.string().min(3).max(100);

export { registerUserValidation, loginUserValidation, getUserValidation };
