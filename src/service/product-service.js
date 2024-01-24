import { validate } from "../validation/validation.js";
import { addProductValidation } from "../validation/product-validation.js";
import { prismaClient } from "../application/database.js";

const addProduct = async (request) => {
  const data = validate(addProductValidation, request);

  return await prismaClient.product.create({
    data: data,
    select: {
      name: true,
    },
  });
};

export default { addProduct };
