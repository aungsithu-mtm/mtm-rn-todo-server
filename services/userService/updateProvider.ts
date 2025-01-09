import { AuthResponse } from './../../graphql/types/authType';
import { v4 as uuidv4 } from 'uuid';
import User from "../../domain/entity/user"
import Provider from '../../domain/model/provider';
import { generateJWT } from "../../helpers/utilities";
import { UserProviderUpdateInput } from '../../graphql/types/userType';

export default async function updateUserProvider(input: UserProviderUpdateInput): Promise<AuthResponse> {
  const { email, provider, firstName, lastName } = input
  const updateProvider : Provider = {
    type: provider
  }
  const user = await User.findOne({ email });

  if (!user) {
    const user = new User({
      _id: uuidv4().toString(),
      email,
      password: "password",
      firstName,
      lastName,
      phone: null,
      address: null,
      username: email,
      isActive: true,
      provider: [updateProvider]
    });

    user.token = generateJWT(user._id, email);
    const respone = await user.save();

    return {
      userId: respone._id,
      email: respone.email,
      token: respone.token
    }
  }

  const providerExist = user.provider.find((p) => p.type == provider);
  if(providerExist == undefined) {
    user.provider.push(updateProvider)
    await user.save();
  }

  return {
    userId: user._id,
    email: user.email,
    token: user.token
  }
}