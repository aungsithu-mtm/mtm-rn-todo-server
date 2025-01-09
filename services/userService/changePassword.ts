import { AuthResponse } from './../../graphql/types/authType';
import { UserChangePasswordInput } from '../../graphql/types/userType';
import User from "../../domain/entity/user"
import bcrypt from "bcryptjs"

export default async function changeUserPassword(input: UserChangePasswordInput, email: string): Promise<AuthResponse> {
  const { currentPassword, newPassword } = input
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(currentPassword, user.password)) {
    user.password = await bcrypt.hash(newPassword, 10);
    const respone = await user.save();

    return {
      userId: respone._id,
      email: respone.email,
      token: respone.token
    }
  }
}