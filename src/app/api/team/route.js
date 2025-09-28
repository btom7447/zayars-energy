import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Team from "@/models/Team";

// Create new team member
export async function POST(req) {
  await connectToDB();
  try {
    const data = await req.json();
    const newMember = await Team.create(data);
    return NextResponse.json({ message: "Team member added", data: newMember }, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating team member:", error);
    return NextResponse.json({ message: "Error creating team member", error: error.message }, { status: 500 });
  }
}

// Get all team members
export async function GET() {
  await connectToDB();
  try {
    const team = await Team.find().sort({ createdAt: -1 });
    return NextResponse.json(team, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching team members:", error);
    return NextResponse.json({ message: "Error fetching team members", error: error.message }, { status: 500 });
  }
}
