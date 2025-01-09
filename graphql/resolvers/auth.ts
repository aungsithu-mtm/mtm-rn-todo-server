import { LoginInput, RegisterInput } from './../types/authType';
import bcrypt from "bcryptjs"
import User from "../../domain/entity/user"
import { APIError } from "../../helpers/errors";
import dotenv from 'dotenv';
import { ApolloError } from 'apollo-server-errors';
import resetPassword from '../../services/authService/resetPassword';
import registerAccount from '../../services/authService/register';

dotenv.config();

export default {
  Mutation: {
    register: async (_: any, { input }: { input: RegisterInput }) => {
      try {
        const emailExist = await User.findOne({ email: input.email });
        if (emailExist) {
          throw new ApolloError(APIError.UserExists, "USER_EXIST", {statusCode: 400});
        }
        const response = await registerAccount(input);
        return response;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    login: async (_: any, { input }: { input: LoginInput }) => {
      const { email, password } = input
      try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
          return {
            userId: user._id,
            email: user.email,
            token: user.token
          }
        }
        throw new ApolloError("InvalidCredentials", "USER_NOT_FOUND", {statusCode: 400});
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    resetPassword: async (_: any, { input }: { input: LoginInput }) => {
      const { email, password } = input
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new ApolloError(APIError.UserNotFound, "USER_NOT_FOUND", {statusCode: 404});
        } else {
          const response = await resetPassword(user, password);
          return response;
        }
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  }
}