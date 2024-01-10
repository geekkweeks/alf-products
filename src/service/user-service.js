import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/error-response.js";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

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

  const userToken = uuid().toString();

  return prismaClient.user.update({
    data: {
      token: userToken,
    },
    where: {
      username: user.username,
    },
    select: {
      token: true,
    },
  });
};

export default { register, login };
