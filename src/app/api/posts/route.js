import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Post from "@/models/Post"; // renamed

// GET all posts
export async function GET() {
  await connectToDB();
  const posts = await Post.find().sort({ createdAt: -1 });
  return NextResponse.json(posts);
}

// CREATE new post
export async function POST(req) {
  await connectToDB();
  const body = await req.json();
  try {
    const newPost = await Post.create(body);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 400 });
  }
}
