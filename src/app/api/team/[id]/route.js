import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Team from "@/models/Team";

export async function GET(req, { params }) {
  await connectToDB();
  try {
    const { id } = params;
    const member = await Team.findById(id);
    if (!member) return NextResponse.json({ message: "Team member not found" }, { status: 404 });
    return NextResponse.json(member, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching team member:", error);
    return NextResponse.json({ message: "Error fetching team member", error: error.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  await connectToDB();
  try {
    const { id } = params;
    const updates = await req.json();
    const member = await Team.findByIdAndUpdate(id, updates, { new: true });
    if (!member) return NextResponse.json({ message: "Team member not found" }, { status: 404 });
    return NextResponse.json({ message: "Updated successfully", data: member }, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating team member:", error);
    return NextResponse.json({ message: "Error updating team member", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connectToDB();
  try {
    const { id } = params;
    const member = await Team.findByIdAndDelete(id);
    if (!member) return NextResponse.json({ message: "Team member not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting team member:", error);
    return NextResponse.json({ message: "Error deleting team member", error: error.message }, { status: 500 });
  }
}
