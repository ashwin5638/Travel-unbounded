import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    role: {
      type: String,
      default: "admin",
      enum: ["admin", "superadmin"]
    }
  },
  {
    timestamps: true
  }
);

const Admin =
  mongoose.models.Admin ||
  mongoose.model("Admin", adminSchema);

export default Admin;
