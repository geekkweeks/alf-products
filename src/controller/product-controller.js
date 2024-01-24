import productService from "../service/product-service.js";

const add = async (req, res, next) => {
  try {
    const result = await productService.addProduct(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export default { add };
