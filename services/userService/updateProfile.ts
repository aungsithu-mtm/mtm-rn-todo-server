import { UserUpdateProfileInput } from '../../graphql/types/userType';
import { ResponseMessage } from '../../graphql/types';
import User from "../../domain/entity/user"

export default async function updateUserProfile(input: UserUpdateProfileInput): Promise<ResponseMessage> {
  const { _id, firstName, lastName, username, email, phone, address, imageUrl } = input
  const user = await User.findOne({ _id });
  if (user) {
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.email = email;
    user.phone = phone;
    user.imageUrl = imageUrl;
    user.address = address;
    await user.save();
  }
  return {
    isSuccess: true,
    message: "User is successfully updated",
    type: "UerUpdated",
    data: null
  }
}