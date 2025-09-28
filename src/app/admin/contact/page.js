"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminDataTable from "@/components/AdminDataTable";

export default function AdminContactPage() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    // Fetch all contacts
    const fetchContacts = async () => {
        setFetching(true);
        try {
            const res = await fetch("/api/contact");
            const data = await res.json();
            setContacts(data);
        } catch (error) {
            console.error("❌ Failed to fetch messages:", error);
            toast.error("Failed to fetch messages");
        } finally {
            setFetching(false);
        }
    };

    // Delete contact by id
    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Delete failed");
            toast.success("message deleted");
            fetchContacts(); // refresh list
        } catch (error) {
            console.error("❌ Failed to delete message:", error);
            toast.error("Failed to delete message");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async (row) => {
        try {
            const res = await fetch(`/api/contact/${row._id}`);
            if (!res.ok) throw new Error("Fetch failed");
            const data = await res.json();

            // Format the data you want to copy
            const textToCopy = `
                Name: ${data.name}
                Email: ${data.email}
                Message: ${data.message}
                Date: ${new Date(data.createdAt).toLocaleString()}
            `.trim();

            await navigator.clipboard.writeText(textToCopy); // copy to clipboard
            toast.success("Message copied to clipboard!");
        } catch (error) {
            console.error("❌ Failed to copy contact:", error);
            toast.error("Failed to copy message");
        }
    };


    useEffect(() => {
        fetchContacts();
    }, []);

    // console.log("Contact Data", contacts)
    return (
        <div className="p-5 lg:p-10">
            <h2 className="text-xl lg:text-3xl text-black font-semibold slate mb-10">
                Contact Messages
            </h2>

            <AdminDataTable
                data={contacts}
                columns={[
                    { key: "name", label: "Name" },
                    { key: "email", label: "Email" },
                    // { key: "message", label: "Message" },
                    { key: "createdAt", label: "Date"}
                ]}
                handleDelete={handleDelete}
                handleCopy={handleCopy}
                viewAction={true}
                rowsPerPage={10}
                fetching={fetching}  // 👈 pass down
            />
        </div>
    );
}
