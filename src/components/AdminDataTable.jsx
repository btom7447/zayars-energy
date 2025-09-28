"use client";

import { useState } from "react";
import { Trash2, Eye, ChevronLeft, ChevronRight, CopyIcon } from "lucide-react";
import { MoonLoader } from "react-spinners";

export default function AdminDataTable({
    data = [],
    columns = [],
    handleDelete,
    handleCopy,
    viewAction = false,
    rowsPerPage = 10,
    fetching
}) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // ✅ Helper: format date values into human-friendly text
    const formatValue = (value) => {
        if (!value) return "";

        // If it's a valid date string or timestamp
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
            return date.toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        }

        return value; // fallback: return raw value
    };

    if (fetching) {
        return (
            <div className="p-30 fixed inset-0 flex items-center justify-center bg-white z-50">
                <MoonLoader color="#1d4ed8" size={40} />
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white rounded-t-3xl border border-gray-100">
            <table className="dataTable w-full border-collapse rounded-t-3xl">
                <thead className="bg-amber-200/70 text-black">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="p-5 text-black text-left text-xl font-semibold"
                            >
                                {col.label}
                            </th>
                        ))}
                        <th className="p-5 pr-10 text-black text-xl text-right font-semibold">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((row) => (
                            <tr key={row._id} className="hover:bg-blue-50">
                                {columns.map((col) => (
                                    <td key={col.key} className="p-5 text-black">
                                        {formatValue(row[col.key])}
                                    </td>
                                ))}
                                <td className="p-5 pr-10 flex justify-end gap-5">
                                    {viewAction && (
                                        <button
                                            onClick={() => handleCopy(row)}
                                            className="cursor-pointer text-blue-600 hover:text-blue-800"
                                        >
                                            <CopyIcon size={25} strokeWidth={1} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(row._id)}
                                        className="cursor-pointer text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 size={25} strokeWidth={1} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length + 1}
                                className="text-center text-black text-2xl p-10"
                            >
                                No records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-10 flex justify-end items-center gap-5 p-5 border-t bg-gray-50">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="cursor-pointer px-2 py-1 border border-gray-500 text-black rounded-xl disabled:opacity-50"
                    >
                        <ChevronLeft size={25} strokeWidth={1} />
                    </button>
                    <span className="text-sm text-black">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="cursor-pointer px-2 py-1 border border-gray-500 text-black rounded-xl disabled:opacity-50"
                    >
                        <ChevronRight size={25} strokeWidth={1} />
                    </button>
                </div>
            )}
        </div>
    );
}
