import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Sie brauchen einen Benutzernamen"],
      unique: true,
      trim: true,
      lowercase:true,
    },
    email: {
      type: String,
      required: [true, "Sie brauchen eine E-Mail Adresse"],
      unique: true,
      trim: true,
      lowercase:true,
    },
    password: {
      type: String,
      required: [true, "Sie brauchen einen Password"],
    },
    role: {
      type: String,
      enum: ["benutzer", "admin"],
      default: "benutzer",
    },
  },
  { timestamps: true }
);

// Hashing passwords
userSchema.pre("save", async function (next) {
  let user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
  next();
});

// compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  let user = this;
  return await bcrypt.compare(candidatePassword, user.password);
};

const User = mongoose.model("User", userSchema);
export default User;
