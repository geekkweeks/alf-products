const validate = (schema, request) => {
  const result = schema.validate(request);
  if (result.console.error) throw result.error;
  else return result.value;
};

export { validate };
