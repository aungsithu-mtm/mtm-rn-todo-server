import { AuthenticationError, ForbiddenError } from "apollo-server-errors"
import { EnhancedRequest } from "../domain/model/enhancedRequest"

const APIError = {
  UserExists: "UserExists",
  JWTNotFound: "JWT_SECRETNotFound",
  Unauthenticated: "Unauthenticated",
  UserNotFound: "UserNotFound",
  notMatched: "NotMatched",

  TaskNotFound: "TaskNotFound"
}

const validateAuthentication = (req: EnhancedRequest, res: Response) => {
  if (!req.isAuth) {
    throw new AuthenticationError(APIError.Unauthenticated)
  }
}

const throwUserNotFound = (res: Response) => {
  throw new ForbiddenError(APIError.UserNotFound)
}

const notMatched = () => {
  throw new ForbiddenError(APIError.notMatched)
}

const throwTaskNotFound = (res: Response) => {
  throw new Error(APIError.TaskNotFound);
}

export {
  APIError,
  validateAuthentication,
  throwUserNotFound,
  notMatched,
  throwTaskNotFound
}