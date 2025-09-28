"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AdminTeamTable from "@/components/AdminTeamTable";
import CreateTeamModal from "@/components/CreateTeamModal";
import EditTeamModal from "@/components/EditTeamModal";

export default function AdminTeamPage() {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    // Fetch team members
    const fetchTeam = async () => {
        setFetching(true);
        try {
            const res = await fetch("/api/team");
            const data = await res.json();
            setTeam(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch team members");
        } finally {
            setFetching(false);
        }
    };

    // Delete a team member
    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Delete failed");
            toast.success("Team member deleted");
            fetchTeam();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete member");
        } finally {
            setLoading(false);
        }
    };

    // View team member
    const handleView = async (row) => {
        try {
            setFetching(true);
            const res = await fetch(`/api/team/${row._id}`);
            if (!res.ok) throw new Error("Fetch failed");
            const data = await res.json();
            setSelectedMember(data);      // store selected member
            setEditModalOpen(true);       // open edit modal
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch member details");
        } finally {
            setFetching(false);
        }
    };


    // Create new team member
    const handleCreate = async (formData) => {
        setLoading(true);
        try {
            const res = await fetch("/api/team", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Create failed");
            const data = await res.json();

            setTeam((prev) => [data.data, ...prev]); // <-- add new member to state immediately
            setModalOpen(false);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditSubmit = (updatedMember) => {
        setTeam((prev) =>
            prev.map((member) => (member._id === updatedMember._id ? updatedMember : member))
        );
    };


    useEffect(() => {
        fetchTeam();
    }, []);

    // console.log("team data", team)
    return (
        <div className="p-5 lg:p-10">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl lg:text-3xl text-black font-semibold slate">
                    Team Members
                </h2>
                <button
                    className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => setModalOpen(true)}
                >
                    Add Team Member
                </button>
            </div>

            <AdminTeamTable
                team={team}
                handleDelete={handleDelete}
                handleView={handleView}
                loading={loading}
                fetching={fetching}
                rowsPerPage={5}
            />

            {modalOpen && (
                <CreateTeamModal
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleCreate}
                    loading={loading}
                    fetching={fetching}
                />
            )}

            {editModalOpen && selectedMember && (
                <EditTeamModal
                    member={selectedMember}
                    onClose={() => setEditModalOpen(false)}
                    onSubmit={handleEditSubmit}
                />
            )}

        </div>
    );
}
