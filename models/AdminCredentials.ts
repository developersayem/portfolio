import mongoose from "mongoose";

const AdminCredentialsSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // bcrypt hash
  },
  { timestamps: true },
);

const AdminCredentials =
  mongoose.models.AdminCredentials ||
  mongoose.model("AdminCredentials", AdminCredentialsSchema);

export default AdminCredentials;
