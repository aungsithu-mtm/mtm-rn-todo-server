export type LoginInput = {
  email: string;
  password: string
}

export type RegisterInput = {
  email: string;
  password: string;
  username: string;
}

export type ResetInput = {
  email: string;
  password: string
}

export type AuthResponse = {
  token: string;
  userId: string;
  email: string;
}

export type ResponseMessage = {
  isSuccess: boolean;
  message: string;
  type: string;
  data: any
}
