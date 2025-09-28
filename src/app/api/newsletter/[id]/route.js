import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Newsletter from "@/models/Newsletter";

export async function GET(req, { params }) {
    await connectToDB();
    try {
        const { id } = params;
        const newsletter = await Newsletter.findById(id);

        if (!newsletter) {
            return NextResponse.json({ message: "Newsletter not found" }, { status: 404 });
        }

        return NextResponse.json(newsletter, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching newsletter:", error);
        return NextResponse.json(
            { message: "Error fetching newsletter", error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    await connectToDB();
    try {
        const { id } = params;
        const newsletter = await Newsletter.findByIdAndDelete(id);

        if (!newsletter) {
            return NextResponse.json({ message: "Newsletter not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Newsletter deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("❌ Error deleting newsletter:", error);
        return NextResponse.json(
            { message: "Error deleting newsletter", error: error.message },
            { status: 500 }
        );
    }
}
