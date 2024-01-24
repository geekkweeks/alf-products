import uploadService from "../service/upload-service.js";

const upload = async (req, res, next) => {
  const result = await uploadService.upload(req);
  res.status(200).json({ data: result });
};

export default { upload };
