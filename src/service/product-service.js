import { validate } from "../validation/validation.js";
import { addProductValidation } from "../validation/product-validation.js";
import { prismaClient } from "../application/database.js";

const addProduct = async (request) => {
  const data = validate(addProductValidation, request);
  const dataProduct = {
    name: data.name,
    description: data.description,
    active: data.active,
    stock: data.stock,
    price: data.price,
    old_price: data.old_price,
  };

  const productResult = await prismaClient.product.create({
    data: dataProduct,
    select: {
      id: true,
      name: true,
    },
  });


  // add link image product
  if (request?.image_id && request.image_id > 0)
    await prismaClient.productImage.create({
      data: { asset_id: request.image_id, product_id: productResult.id },
    });

  return productResult;
};

export default { addProduct };
