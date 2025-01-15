import { UserCreateInput, ResponseMessage } from '../../graphql/types'
import bcrypt from "bcryptjs"
import Provider from "../../domain/model/provider"
import { v4 as uuidv4 } from 'uuid';
import User from "../../domain/entity/user"

export default async function createUser(data: UserCreateInput): Promise<ResponseMessage> {
    const { email, password, username } = data;
    const hashPwd = await bcrypt.hash(password, 10);
    const provider: Provider = {
        type: "email"
    }
    const user = new User({
        _id: uuidv4().toString(),
        email,
        password: hashPwd,
        firstName: "",
        lastName: "",
        phone: null,
        address: null,
        username: username,
        imageUrl: null,
        isActive: true,
        provider: [provider]
    });
    await user.save();
    return {
        isSuccess: true,
        message: "User is successfully created",
        type: "UerCreated",
        data: null
    }
}