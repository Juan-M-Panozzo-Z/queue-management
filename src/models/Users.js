import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Users = mongoose.model("users", usersSchema);

export default Users;
