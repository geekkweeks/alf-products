import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/error-response.js";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (request) => {
  // user validation
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "User already registered");
  }

  // encrypt user password
  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

const login = async (request) => {
  const cookies = request.cookies;

  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: { username: loginRequest.username },
    select: {
      username: true,
      password: true,
    },
  });

  if (!user) throw new ResponseError(401, "Username or password wrong");

  const isPasswordMatch = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!isPasswordMatch)
    throw new ResponseError(401, "Username or password wrong");

  // generate new token
  const accessToken = jwt.sign(
    { userInfo: { username: user.username, roles: [] } },
    process.env.JWT_KEY,
    {
      expiresIn: "60000", // in 1 min
    }
  );

  const refreshAccessToken = jwt.sign(
    { userInfo: { username: user.username, roles: [] } },
    process.env.JWT_KEY,
    {
      expiresIn: "120000", // in 2 min
    }
  );
  const res = {
    username: user.username,
    accessToken,
    refreshAccessToken,
  };
  return res;
};

const refresh = async (req) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) return new ResponseError(401, "Invalid token");

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_KEY);
    const accessToken = jwt.sign(
      { userInfo: { username: user.username, roles: [] } },
      process.env.JWT_KEY,
      {
        expiresIn: "60000", // in 1 min
      }
    );
    return accessToken;
  } catch (err) {
    return new ResponseError(401, "Invalid token");
  }
};

const get = async () => {
  const users = await prismaClient.user.findMany({
    select: {
      username: true,
      name: true,
    },
  });
  if (!users || users.length === 0)
    return new ResponseError(404, "Users not found");

  return users;
};

const findUser = async (search) => {
  if (search.length < 3)
    throw new ResponseError(400, "Minimum 3 chars for searching!!!");

  const users = await prismaClient.user.findMany({
    where: {
      OR: [
        {
          username: {
            startsWith: search,
          },
        },
        {
          username: {
            endsWith: search,
          },
        },
        {
          name: {
            startsWith: search,
          },
        },
        {
          name: {
            endsWith: search,
          },
        },
      ],
    },
    select: {
      username: true,
      name: true,
    },
  });

  if (!users || users.length === 0)
    throw new ResponseError(404, "User not found");

  return users;
};

export default { register, login, refresh, findUser, get };
