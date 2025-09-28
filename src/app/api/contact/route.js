import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req) {
  await connectToDB();

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newContact = await Contact.create({ name, email, message });

    return NextResponse.json(
      { message: "Message received!", data: newContact },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Contact form error:", error);
    return NextResponse.json(
      { message: "Error saving message", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ GET all messages
export async function GET() {
  await connectToDB();
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    return NextResponse.json(
      { message: "Error fetching messages", error: error.message },
      { status: 500 }
    );
  }
}
