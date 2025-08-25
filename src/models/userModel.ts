import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: 'string',
      required: true,
      trim: true,
    },
    email: {
      type: 'string',
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: 'string',
      required: true,
    },
  },
  { timestamps: true },
);

const User = model<IUser>('User', userSchema);

export default User;
