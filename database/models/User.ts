import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phonenumber: { type: String, required: true, unique: true }, // Added unique constraint here
    usertype: { type: String, required: true, enum: ['ndrf', 'citizen'] },
    token: { type: String }, // Added token field for authentication
  },
  { timestamps: true }
);

// Handling Unique Constraint Errors
UserSchema.post('save', function (error: any, doc: any, next: any) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    if (error.keyPattern?.email) {
      next(new Error('Email already exists.'));
    } else if (error.keyPattern?.phonenumber) {
      next(new Error('Phone number already exists.'));
    } else {
      next(error);
    }
  } else {
    next(error);
  }
});

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id, email: this.email }, process.env.SECRET_KEY as string, {
    expiresIn: '1d',
  });
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
