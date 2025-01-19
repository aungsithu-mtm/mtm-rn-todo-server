import { UserUpdateProfileInput } from '../../graphql/types/userType';
import { ResponseMessage } from '../../graphql/types';
import User from "../../domain/entity/user"
import { deleteImageServer } from "../imageService/cloudinary"

export default async function updateUserProfile(input: UserUpdateProfileInput): Promise<ResponseMessage> {
  const { _id, firstName, lastName, username, email, phone, address, imageUrl, publicId } = input
  const user = await User.findOne({ _id });
  if((user.imageUrl !== input.imageUrl && input.imageUrl != null) && user.publicId != null) {
    await deleteImageServer(user.publicId);
  }
  if (user) {
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.email = email;
    user.phone = phone;
    user.imageUrl = imageUrl;
    user.publicId = publicId;
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