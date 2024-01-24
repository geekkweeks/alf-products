import { prismaClient } from "../application/database.js";

const upload = async (request) => {
  console.log("reques: ", request?.file);

  return await prismaClient.asset.create({
    data: {
      name: request?.file?.filename,
      original_name: request?.file?.originalname,
      location: request?.file?.destination,
    },
    select: {
      id: true,
    },
  });
};

export default { upload };
