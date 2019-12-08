import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;
const saltRounds = 10;

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true
    },
    password: String,
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: false }
);

userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await bcrypt.hashSync(this.password, saltRounds);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.isPasswordValid = function(password) {
  try {
    return bcrypt.compareSync(password, this.password);
  } catch (error) {
    throw error;
  }
};

export const User = mongoose.model("User", userSchema);
