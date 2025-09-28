"use client";

import { useState, useMemo } from "react";
import {
    ClockIcon,
    Trash2,
    LayoutGridIcon,
    LayoutListIcon,
    PencilLineIcon,
    PenToolIcon,
    PlusIcon,
    SearchIcon,
    ChevronDown,
    XIcon,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";

function CustomSelect({ label, options, value, onChange, name }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative col-span-1 cursor-pointer">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="cursor-pointer w-full flex justify-between items-center p-3 rounded-xl border border-gray-300 bg-white text-black text-sm font-light focus:outline-none focus:ring-1 focus:ring-yellow-500"
            >
                {value || label}
                <ChevronDown
                    className={`ml-2 h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <ul className="absolute z-10 w-full mt-2 rounded-xl border border-gray-300 bg-white shadow-lg max-h-60 overflow-y-auto">
                    {options.map((option, idx) => (
                        <li
                            key={idx}
                            onClick={() => {
                                onChange({ target: { name, value: option } });
                                setOpen(false);
                            }}
                            className={`p-3 cursor-pointer hover:bg-gray-100 text-gray-700 text-sm ${
                                value === option ? "bg-gray-200 font-medium" : ""
                            }`}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function PostsSection({
    posts,
    fetchPosts,
    onEdit,
    onCreate,
    viewMode,
    toggleView,
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState(""); // '', 'Today', ...
    const [currentPage, setCurrentPage] = useState(1);

    const POSTS_PER_PAGE = 10;

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });

            if (res.ok) {
            toast.success("Post deleted!");
            fetchPosts(); // refresh the list
            } else {
            toast.error("Failed to delete post");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while deleting");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        });
    };

    // Helpers to get start of day (local)
    const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const subtractDays = (d, days) => {
        const copy = new Date(d);
        copy.setDate(copy.getDate() - days);
        return copy;
    };

    // Filter + Search + Date logic (accurate boundaries)
    const filteredPosts = useMemo(() => {
        let filtered = posts || [];

        // Search
        if (searchTerm.trim()) {
            const q = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (post) =>
                (post.title || "").toLowerCase().includes(q) ||
                (post.content || "").toLowerCase().includes(q)
            );
        }

        // Date filter
        if (filter) {
            const today = new Date();
            const todayStart = startOfDay(today);

            filtered = filtered.filter((post) => {
                const createdAt = new Date(post.createdAt);
                if (isNaN(createdAt)) return false;

                if (filter === "Today") {
                    const tomorrowStart = new Date(todayStart);
                    tomorrowStart.setDate(tomorrowStart.getDate() + 1);
                    return createdAt >= todayStart && createdAt < tomorrowStart;
                }

                if (filter === "Yesterday") {
                    const yesterdayStart = subtractDays(todayStart, 1);
                    return createdAt >= yesterdayStart && createdAt < todayStart;
                }

                if (filter === "Last Week") {
                    // last 7 days including today
                    const lastWeekStart = subtractDays(todayStart, 6); // include today => 7 days
                    return createdAt >= lastWeekStart && createdAt <= new Date(); // up to now
                }

                if (filter === "Last Month") {
                    // last 30 days
                    const lastMonthStart = subtractDays(todayStart, 29); // 30 days total
                    return createdAt >= lastMonthStart && createdAt <= new Date();
                }

                if (filter === "Last Year") {
                    const lastYearStart = new Date(today);
                    lastYearStart.setFullYear(lastYearStart.getFullYear() - 1);
                    lastYearStart.setHours(0, 0, 0, 0);
                    return createdAt >= lastYearStart && createdAt <= new Date();
                }

                return true;
            });
        }

        return filtered;
    }, [posts, searchTerm, filter]);

    // Pagination logic
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 0;
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    // Reset page when filters change
    const onSearchChange = (v) => {
        setSearchTerm(v);
        setCurrentPage(1);
    };
    const onFilterChange = (val) => {
        // when user selects 'All' in select we will receive "All" — convert to ''
        const newFilter = val === "All" ? "" : val;
        setFilter(newFilter);
        setCurrentPage(1);
    };

    return (
        <div className="mt-5 space-y-10">
            {/* Actions Bar */}
            <div className="flex gap-5 flex-wrap justify-between items-center">
                <div className="flex items-center gap-5 w-full lg:w-1/2">
                    {/* Search */}
                    <div className="w-2/3 lg:w-1/2 flex items-center border border-gray-300 rounded-xl p-1 px-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="flex-1 p-2 text-md text-black outline-none"
                        />
                        {searchTerm ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm("");
                                    setCurrentPage(1);
                                }}
                                className="p-1 text-gray-500 hover:text-gray-700"
                            >
                                <XIcon size={20} strokeWidth={1.5} />
                            </button>
                        ) : (
                            <SearchIcon size={20} color="#000" strokeWidth={1} />
                        )}
                    </div>

                    {/* Date Filter */}
                    <div className="min-w-40">
                        <CustomSelect
                            label="Filter by"
                            options={["All", "Today", "Yesterday", "Last Week", "Last Month", "Last Year"]}
                            value={filter || "All"}
                            onChange={(e) => onFilterChange(e.target.value)}
                            name="dateFilter"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-fit flex justify-end lg:justify-start space-x-5">
                    <button
                        onClick={onCreate}
                        className="bg-blue-950 text-white p-2 rounded-xl cursor-pointer"
                    >
                        <PlusIcon size={25} strokeWidth={1} />
                    </button>

                    {/* Toggle View */}
                    <button
                        onClick={toggleView}
                        className="bg-gray-300 text-black p-2 rounded-xl cursor-pointer"
                    >
                        {viewMode === "grid" ? <LayoutListIcon size={25} strokeWidth={1} /> : <LayoutGridIcon size={25} strokeWidth={1} />}
                    </button>
                </div>
            </div>

            {/* Posts List/Grid or fallback */}
            {paginatedPosts.length > 0 ? (
                <div
                    className={`grid gap-5 grid-cols-1 lg:grid-cols-2 ${viewMode === "grid" ? "xl:grid-cols-3 gap-5" : ""}`}
                >
                    {paginatedPosts.map((post) => (
                        <div
                            key={post._id}
                            className={`relative border border-gray-200 rounded-2xl bg-white text-black overflow-hidden ${viewMode === "grid" ? "" : "flex gap-5"}`}
                        >
                            {post.imageUrl && (
                                <>
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className={`object-cover rounded-xl bg-black/15 ${
                                            viewMode === "grid" ? "h-40 lg:h-60 w-full" : "w-full lg:w-1/3 h-40 lg:h-60"
                                        }`}
                                    />
                                </>
                            )}
                        <div className="p-5 flex flex-col justify-start">
                            <h2 className="text-xl lg:text-2xl font-semibold mb-5">
                                {post.title}
                            </h2>
                            <p className={`text-gray-600 line-clamp-2 text-md `}>
                                {post.content}
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                                <p className="text-sm text-gray-600 flex items-center gap-3">
                                    <PenToolIcon size={20} strokeWidth={1} /> {post.author}
                                </p>
                                <p className="text-sm text-gray-600 flex items-center gap-3">
                                    <ClockIcon size={20} strokeWidth={1} /> {formatDate(post.createdAt)}
                                </p>
                            </div>
                        </div>

                        <div className={`absolute flex gap-3 ${viewMode === "grid" ? "top-3 right-3" : "top-3 left-3"}`}>
                            <button onClick={() => onEdit(post)} className="p-2 bg-yellow-500 text-white rounded-full cursor-pointer">
                                <PencilLineIcon size={25} strokeWidth={1} />
                            </button>
                            <button onClick={() => handleDelete(post._id)} className="p-2 bg-red-600 text-white rounded-full cursor-pointer">
                                <Trash2 size={25} strokeWidth={1} />
                            </button>
                        </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <SearchIcon size={40} strokeWidth={1} className="mb-4" />
                    <p className="text-lg font-medium">No posts found</p>
                    <p className="text-sm">Try adjusting your search or filter</p>
                </div>
            )}

            {/* Pagination Controls (hide if single page or no posts) */}
            {totalPages > 1 && (
                <div className="flex justify-end items-center gap-5 mt-10">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className="cursor-pointer px-2 py-1 border border-gray-500 text-black rounded-xl disabled:opacity-50"
                    >
                        <ChevronLeft size={25} strokeWidth={1} />
                    </button>

                    <span className="text-sm text-black">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        className="cursor-pointer px-2 py-1 border border-gray-500 text-black rounded-xl disabled:opacity-50"
                    >
                        <ChevronRight size={25} strokeWidth={1} />
                    </button>
                </div>
            )}
        </div>
    );
}
