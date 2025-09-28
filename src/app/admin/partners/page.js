"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminDataTable from "@/components/AdminDataTable";

export default function AdminPartnersPage() {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);

    // Fetch all contacts
    const fetchPartners = async () => {
        setFetching(true);
        try {
            const res = await fetch("/api/partner");
            const data = await res.json();
            setPartners(data);
        } catch (error) {
            console.error("❌ Failed to fetch partners:", error);
            toast.error("Failed to fetch partners");
        } finally {
            setFetching(false);
        }
    };

    // Delete partners by id
    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/partner/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Delete failed");
            toast.success("partner deleted");
            fetchPartners(); // refresh list
        } catch (error) {
            console.error("❌ Failed to delete partners:", error);
            toast.error("Failed to delete partners");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async (row) => {
        try {
            const res = await fetch(`/api/partner/${row._id}`);
            if (!res.ok) throw new Error("Fetch failed");
            const data = await res.json();

            // Format the data you want to copy
            const textToCopy = `
                Name: ${data.name}
                Email: ${data.email}
                phone: ${data.phone}
                organization: ${data.organization}
                organization Type: ${data.orgType}
                Interest: ${data.interest}
                Message: ${data.message}
                Date: ${new Date(data.createdAt).toLocaleString()}
            `.trim();

            await navigator.clipboard.writeText(textToCopy); // copy to clipboard
            toast.success("copied to clipboard!");
        } catch (error) {
            console.error("❌ Failed to copy:", error);
            toast.error("Failed to copy");
        }
    };


    useEffect(() => {
        fetchPartners();
    }, []);

    // console.log("Contact Data", contacts)
    return (
        <div className="p-5 lg:p-10">
            <h2 className="text-xl lg:text-3xl text-black font-semibold slate mb-10">
                Contact Messages
            </h2>

            <AdminDataTable
                data={partners}
                columns={[
                    { key: "organization", label: "Organization" },
                    { key: "email", label: "Email" },
                    { key: "phone", label: "Phone" },
                    { key: "orgType", label: "Type" },
                    { key: "interest", label: "Interest" },
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
