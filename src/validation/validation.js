import { ResponseError } from "../error/error-response.js";

const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false, // reject for unknown object prop that sent from the client
  });
  if (result.error) throw new ResponseError(400, result.error.message);
  else return result.value;
};

export { validate };
