import allowedOrigins from "../config/allowed-origins.js";

const credentials = async (req, res, next) => {
  console.log("credentials");
  const origin = req.headers.origin;
  console.log(`Credentials : `, origin);
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
    // res.set("Access-Control-Allow-Origin", "*");
  }
  next();
};

export { credentials };
