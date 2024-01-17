import { prismaClient } from "../application/database.js";
import jwt from "jsonwebtoken";
import allowedOrigins from "../config/allowed-origins.js";

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.get("Authorization");
    let refreshToken = req.cookies["refreshToken"];

    if (!token || !refreshToken)
      res
        .status(401)
        .json({ errors: "Access denied. No Token provided" })
        .end();

    // token value: Bearer xxxxx. To verify need to be splitted
    token = token.split(" ")[1];

    if (!token) res.status(401).json({ errors: "Unauthorized" }).end();
    else {
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      req.username = decoded.username;

      // find user by username
      const user = await prismaClient.user.findFirst({
        where: {
          username: req.username,
        },
      });

      if (!user) res.status(401).json({ errors: "Invalid token" });
      else next();
    }
  } catch (err) {
    res.status(401).json({ errors: "Invalid token" }).end();
  }
};

export { authMiddleware };
