import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

// GET single contact by id
export async function GET(req, { params }) {
    await connectToDB();

    try {
        const contact = await Contact.findById(params.id);

        if (!contact) {
            return NextResponse.json({ message: "Contact not found" }, { status: 404 });
        }

        return NextResponse.json(contact, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching contact:", error);
        return NextResponse.json(
            { message: "Error fetching contact", error: error.message },
            { status: 500 }
        );
    }
}

// DELETE a contact by id
export async function DELETE(req, { params }) {
    await connectToDB();

    try {
        const deleted = await Contact.findByIdAndDelete(params.id);

        if (!deleted) {
            return NextResponse.json({ message: "Contact not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Contact deleted" }, { status: 200 });
    } catch (error) {
        console.error("❌ Error deleting contact:", error);
        return NextResponse.json(
            { message: "Error deleting contact", error: error.message },
            { status: 500 }
        );
    }
}
