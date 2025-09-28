import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Newsletter from "@/models/Newsletter";

export async function POST(req) {
  await connectToDB();

  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const newEmail = await Newsletter.create({ email });

    // Send to Formspree
    await fetch("https://formspree.io/f/mrbygwnd", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    return NextResponse.json({ message: "Subscribed!", data: newEmail }, { status: 201 });
  } catch (error) {
    console.error("❌ Newsletter subscription error:", error);
    return NextResponse.json(
      { message: "Error subscribing", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectToDB();
  try {
    const newsletter = await Newsletter.find().sort({ createdAt: -1 });
    return NextResponse.json(newsletter, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching newsletter:", error);
    return NextResponse.json(
      { message: "Error fetching newsletters", error: error.message },
      { status: 500 }
    );
  }
}
