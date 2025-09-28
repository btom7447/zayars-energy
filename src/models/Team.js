import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  title: { type: String },
  twitter: { type: String },
  linkedin: { type: String },
  photoUrl: { type: String },
  bio: { type: String },
  adminAccess: { type: Boolean, default: false },
  visible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Avoid model overwrite on hot reload
export default mongoose.models.Team || mongoose.model("Team", TeamSchema);