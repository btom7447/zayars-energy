import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Partner from "@/models/Partner";

// GET partner by ID
export async function GET(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;

    const partner = await Partner.findById(id);
    if (!partner) return NextResponse.json({ message: "Partner not found" }, { status: 404 });

    return NextResponse.json(partner, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching partner:", error);
    return NextResponse.json({ message: "Failed to fetch partner", error: error.message }, { status: 500 });
  }
}

// PATCH partner by ID
export async function PATCH(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;
    const updates = await req.json();

    const updatedPartner = await Partner.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedPartner) return NextResponse.json({ message: "Partner not found" }, { status: 404 });

    return NextResponse.json({ message: "Partner updated successfully", data: updatedPartner }, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating partner:", error);
    return NextResponse.json({ message: "Failed to update partner", error: error.message }, { status: 500 });
  }
}

// DELETE partner by ID
export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const { id } = params;

    const deletedPartner = await Partner.findByIdAndDelete(id);
    if (!deletedPartner) return NextResponse.json({ message: "Partner not found" }, { status: 404 });

    return NextResponse.json({ message: "Partner deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting partner:", error);
    return NextResponse.json({ message: "Failed to delete partner", error: error.message }, { status: 500 });
  }
}
