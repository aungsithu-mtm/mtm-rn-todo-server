import mongoose from "mongoose"
import Provider from "../model/provider"

const Schema = mongoose.Schema
export interface IUser {
  _id: string
  firstName: string
  lastName: string
  username: string
  email: string
  phone: string
  address: string
  imageUrl: string
  password: string
  token: string
  publicId: string
  isActive: boolean
  provider: Provider[]
  createdAt: Date
  updatedAt: Date
}

export const userSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: false,
      trim: true,
      maxlength: 50
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
      maxlength: 50
    },
    username: {
      type: String,
      required: false,
      trim: true,
      minlength: 2,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: false,
      trim: true,
      sparse: true,
      minlength: 9,
      maxlength: 11
    },
    address: {
      type: String,
      required: false,
      trim: true
    },
    publicId: {
      type: String,
      require: false
    },
    imageUrl: {
      type: String,
      require: false,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 100
    },
    token: {
      type: String,
      required: false
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true
    },
    provider: {
      type: [],
      required: false
    }
  },
  { timestamps: true }
);

const UserMongoModel = mongoose.model<IUser>("User", userSchema)
export type UserExtended = IUser & mongoose.Document<any, any>
export default UserMongoModel