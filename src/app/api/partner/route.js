import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Partner from "@/models/Partner";

export async function POST(req) {
    try {
        await connectToDB();

        const body = await req.json();

        // Basic validation
        if (!body.organization || !body.email || !body.orgType || !body.interest || !body.message) {
            return NextResponse.json(
                { message: "All required fields must be filled." },
                { status: 400 }
            );
        }

        // Save to DB
        const newPartner = await Partner.create(body);

        return NextResponse.json(
            { message: "Partnership request submitted!", data: newPartner },
            { status: 201 }
        );
    } catch (error) {
        console.error("❌ Partner submission error:", error);
        return NextResponse.json(
            { message: "Error submitting request", error: error.message },
            { status: 500 }
        );
    }
}
