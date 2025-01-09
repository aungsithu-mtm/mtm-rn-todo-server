import { APIError } from "./errors";
import jwt from "jsonwebtoken"

const generateUsername = (firstname: string, lastname: string) => {
  return `${firstname.toLowerCase()}.${lastname.toLowerCase()}`
}

const generateJWT = (id: string, email: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error(APIError.JWTNotFound);
  }
  const token = jwt.sign({ userId: id, email }, process.env.JWT_SECRET);
  return token;
}

export {
  generateUsername,
  generateJWT
}