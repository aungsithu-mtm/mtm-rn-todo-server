import type { UserExtended } from '../../domain/entity/user';
import bcrypt from "bcryptjs"
import { AuthResponse } from '../../graphql/types'

export default async function resetPassword(user: UserExtended, password: string): Promise<AuthResponse> {
  const hashPwd = await bcrypt.hash(password, 10);
  user.password = hashPwd;
  await user.save();
  return {
    userId: user._id,
    email: user.email,
    token: user.token
  }
}