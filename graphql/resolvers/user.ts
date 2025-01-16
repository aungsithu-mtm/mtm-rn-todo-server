import { ApolloError } from "apollo-server-errors";
import User, { userSchema } from "../../domain/entity/user";
import {
    throwUserNotFound,
    validateAuthentication,
} from "../../helpers/errors";
import { UserChangePasswordInput, UserProviderUpdateInput } from "../types";
import updateUserProvider from "../../services/userService/updateProvider";
import changeUserPassword from '../../services/userService/changePassword';
import { UserUpdateProfileInput, UserCreateInput } from "../types/userType";
import updateUserProfile from "../../services/userService/updateProfile";
import createUser from "../../services/userService/createUser"
import { deleteUser } from "../../services/userService/deleteUser"

export default {
    Query: {
        users: async (_, arg, { req, res }) => {
            try {
                validateAuthentication(req, res);
                const users = await User.find();
                return users;
            } catch (error) {
                throw new ApolloError(error);
            }
        },
        user: async (parent: any, { id }: any, { req, res }) => {
            try {
                validateAuthentication(req, res);
                const userExist = await User.findById(id);
                if (!userExist) throwUserNotFound(res);
                return userExist;
            } catch (error) {
                throw new ApolloError(error);
            }
        },
        userProfile: async (_, arg, { req, res }) => {
            try {
                validateAuthentication(req, res);
                const user = await User.findOne({ _id: req.userId });
                if (!user) return throwUserNotFound(res)
                return {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    address: user.address,
                    phone: user.phone,
                    imageUrl: user.imageUrl,
                    isActive: user.isActive,
                };
            } catch (error) {
                throw new ApolloError(error);
            }
        },
    },
    Mutation: {
        createUser: async (_: any, { input }: { input: UserCreateInput }, { req, res }) => {
            try {
                validateAuthentication(req, res);
                const user = await User.findOne({ _id: req.userId });
                if (!user) throwUserNotFound(res);
                const response = await createUser(input);
                return response;
            } catch (error) {
                throw new ApolloError(error);
            }
        },
        updateUserProvider: async (
            _: any,
            { input }: { input: UserProviderUpdateInput }
        ) => {
            try {
                const response = await updateUserProvider(input);
                return response;
            } catch (error) {
                throw new ApolloError(error);
            }
        },
        changeUserPassword: async (_: any, { input }: { input: UserChangePasswordInput }, { req, res }) => {
            try {
                validateAuthentication(req, res);
                const user = await User.findOne({ email: req.email });
                if (!user) throwUserNotFound(res);
                const response = await changeUserPassword(input, req.email);
                return response;
            } catch (error) {
                throw new ApolloError(error);
            }
        },
        updateUserProfile: async (_: any, { input }: { input: UserUpdateProfileInput }, { req, res }) => {
            try {
                validateAuthentication(req, res);
                const user = await User.findOne({ _id: req.userId });
                if (!user) throwUserNotFound(res);
                const response = await updateUserProfile(input);
                return response;
            } catch (error) {
                throw new ApolloError(error);
            }
        },
        deleteUser: async (_: any, arg, { req, res }) => {
            try {
                validateAuthentication(req, res);
                const user = await User.findOne({ email: req.email });
                if (!user) return throwUserNotFound(res);
                const result = await user.deleteOne({ email: req.email });
                if (result.deletedCount === 1) {
                    return {
                        isSuccess: true,
                        message: 'User deleted successfully',
                        type: "UserDeleted",
                        data: null
                    }
                }
            } catch (error) {
                throw new ApolloError(error);
            }
        },
        deleteUsers: async (_, { input }: { input: String[] }, { res, req }) => {
            try {
                validateAuthentication(req, res);
                const response = await deleteUser.deleteUsers(input, res);
                return response;
            } catch (error) {
                throw new ApolloError(error);
            }
        },

    },
};
