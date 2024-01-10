import { prismaClient } from "../application/database.js";

const authMiddleware = async (req, res, next) => {
  const errorMessage = "Unauthorized";
  const token = req.get("Authorization");
  if (!token) res.status(401).json({ errors: errorMessage }).end();
  else {
    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
    });

    if (!user) res.status(401).json({ errors: errorMessage }).end();
    else {
      // add user object into request
      req.user = user;
      next();
    }
  }
};

export { authMiddleware };
