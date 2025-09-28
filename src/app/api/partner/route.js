import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Partner from "@/models/Partner";

// GET all partners
export async function GET() {
  try {
    await connectToDB();
    const partners = await Partner.find().sort({ createdAt: -1 });
    return NextResponse.json(partners, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching partners:", error);
    return NextResponse.json({ message: "Failed to fetch partners", error: error.message }, { status: 500 });
  }
}

// POST new partner
export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();

    if (!body.organization || !body.email || !body.orgType || !body.interest || !body.message) {
      return NextResponse.json({ message: "All required fields must be filled." }, { status: 400 });
    }

    const newPartner = await Partner.create(body);
    return NextResponse.json({ message: "Partnership request submitted!", data: newPartner }, { status: 201 });
  } catch (error) {
    console.error("❌ Partner submission error:", error);
    return NextResponse.json({ message: "Error submitting request", error: error.message }, { status: 500 });
  }
}
