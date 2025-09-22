import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Post from "@/models/Post"; // renamed

// GET single post
export async function GET(req, { params }) {
  await connectToDB();
  const post = await Post.findById(params.id);
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json(post);
}

// UPDATE single post
export async function PUT(req, { params }) {
  await connectToDB();
  const body = await req.json();
  try {
    const updatedPost = await Post.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 400 });
  }
}

// DELETE single post
export async function DELETE(req, { params }) {
  await connectToDB();
  try {
    await Post.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 400 });
  }
}
