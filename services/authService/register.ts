import { AuthResponse, RegisterInput } from '../../graphql/types'
import bcrypt from "bcryptjs"
import Provider from "../../domain/model/provider"
import { generateJWT } from "../../helpers/utilities";
import { v4 as uuidv4 } from 'uuid';
import User from "../../domain/entity/user"

export default async function registerAccount(data: RegisterInput): Promise<AuthResponse> {
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
    publicId: null,
    isActive: true,
    provider: [provider]
  });
  user.token = generateJWT(user._id, email);
  const response = await user.save();
  return {
    userId: response._id,
    email: response.email,
    token: response.token
  }
}