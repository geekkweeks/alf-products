import userService from "../service/user-service.js";

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};
const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);

    res
      .cookie("refreshToken", result?.refreshAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .header("Authorization", result?.accessToken)
      .status(200)
      .json({ username: result?.username, accessToken: result?.accessToken });
  } catch (e) {
    next(e);
  }
};

const refresh = async (req, res, next) => {
  try {
    const result = await userService.refresh(req);
    res.header("Authorization", result?.accessToken);
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await userService.get();
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const isUserExist = async (req, res, next) => {
  try {
    const paramValue = req.param("username");
    if (!paramValue) throw new Error("Invalid param");

    const result = await userService.isUserExist(paramValue);
    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    if (!req.query.search) throw new Error("Invalid search");

    const result = await userService.findUser(req.query.search);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
  get,
  find,
  isUserExist,
};
