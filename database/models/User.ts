import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phonenumber: { type: String, required: true },
    usertype: { type: String, required: true, enum: ['ndrf', 'citizen'] },
    token: { type: String }, // Added token field for authentication
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, email: this.email }, process.env.SECRET_KEY as string, {
    expiresIn: "1d",
  });
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
