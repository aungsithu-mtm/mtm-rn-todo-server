export type UserProviderUpdateInput = {
  firstName: string;
  lastName: string;
  email: string;
  provider: string;
};

export type UserChangePasswordInput = {
  currentPassword: string;
  newPassword: string
}

export type UserUpdateProfileInput = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone: string;
  address: string;
  isActive: boolean;
  imageUrl: string
}

export type UserCreateInput = {
  email: string;
  username: string;
  password: string;
}