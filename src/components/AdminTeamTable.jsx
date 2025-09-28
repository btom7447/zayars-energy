"use client";

import { Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { MoonLoader } from "react-spinners";

export default function AdminTeamTable({
  team = [],
  handleDelete,
  handleView,
  rowsPerPage = 10,
  loading,
  fetching,
}) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(team.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = team.slice(startIndex, startIndex + rowsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    if (fetching) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-white">
                <MoonLoader color="#1d4ed8" size={40} />
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white rounded-t-3xl border border-gray-100">
            {team.length === 0 ? (
                <div className="p-10 text-center text-gray-700 text-xl">
                    No team members found.
                </div>
            ) : (
                <>
                    <table className="w-full border-collapse rounded-t-3xl">
                        <thead className="bg-amber-200/70 text-black">
                            <tr>
                                <th className="p-5 text-left">Photo</th>
                                <th className="p-5 text-left">Full Name</th>
                                <th className="p-5 text-left">Role</th>
                                <th className="p-5 text-left">Email</th>
                                <th className="p-5 text-left">Admin Access</th>
                                <th className="p-5 text-left">Visible</th>
                                <th className="p-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((row) => (
                                <tr key={row._id} className="hover:bg-blue-50">
                                    <td className="p-5">
                                        {row.photoUrl && (
                                        <img
                                            src={row.photoUrl}
                                            alt={row.fullName}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        )}
                                    </td>
                                    <td className="p-5 text-black">{row.fullName}</td>
                                    <td className="p-5 text-black">{row.role}</td>
                                    <td className="p-5 text-black">{row.email || "-"}</td>
                                    <td className="p-5">
                                        <span
                                            className={`px-5 py-2 rounded-full border text-white text-sm font-medium ${
                                            row.adminAccess ? "bg-green-600 border-green-900 text-white" : "bg-red-400 border-red-600"
                                            }`}
                                        >
                                            {row.adminAccess ? "Yes" : "No"}
                                        </span>
                                        </td>
                                        <td className="p-5">
                                        <span
                                            className={`px-5 py-2 rounded-full border text-sm font-medium ${
                                            row.visible ? "bg-green-600 border-green-900 text-white" : "bg-red-400 border-red-600"
                                            }`}
                                        >
                                            {row.visible ? "Yes" : "No"}
                                        </span>
                                    </td>
                                    <td className="p-5 flex justify-end gap-3">
                                        <button
                                            onClick={() => handleView(row)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Eye size={20} strokeWidth={1} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(row._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={20} strokeWidth={1} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {totalPages > 1 && (
                        <div className="flex justify-between items-center p-3 border-t bg-gray-50">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Prev
                            </button>
                            <span>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
