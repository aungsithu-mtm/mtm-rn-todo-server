import { ResponseMessage } from "../../graphql/types/authType";
import User from "../../domain/entity/user";
import { throwUserNotFound } from "../../helpers/errors";

export const deleteUser = {
    deleteUser: async (id: String, res: Response): Promise<ResponseMessage> => {
        const user = await User.findOne({ _id: id });
        if (!user) return throwUserNotFound(res);
        await user.deleteOne({ _id: id });
        return {
            isSuccess: true,
            message: "User is successfully deleted.",
            type: "UserDeleted",
            data: null,
        };
    },
    deleteUsers: async (
        input: String[],
        res: Response
    ): Promise<ResponseMessage> => {

        if (input.length === 0) {
            return {
                isSuccess: false,
                message: "No user to delete.",
                type: "Error",
                data: null,
            };
        }

        const users = await User.find({ _id: { $in: input } });

        const missingUser = input.filter(id => !users.some(user => user._id.toString() === id));
        if (missingUser.length > 0) {
            return throwUserNotFound(res);
        }

        await Promise.all(users.map(async (user) => {
            await user.deleteOne();
        }));

        return {
            isSuccess: true,
            message: "Selected users are successfully deleted.",
            type: "UserDeleted",
            data: null,
        };
    },

};
