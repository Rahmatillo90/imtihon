import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { versionKey: false, timestamps: true }
);

const UserModel = model("users", UserSchema);
export default UserModel;
