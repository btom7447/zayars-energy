import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: "Anonymous" },
  imageUrl: { type: String },
  published: { type: Boolean, default: false }, 
  createdAt: { type: Date, default: Date.now },
});

// Avoid model overwrite on hot reload
export default mongoose.models.Post || mongoose.model("Post", PostSchema);