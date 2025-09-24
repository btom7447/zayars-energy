"use client";

import { ClockIcon, DeleteIcon, LayoutGridIcon, LayoutListIcon, PencilLineIcon, PenToolIcon, PlusIcon } from "lucide-react";
import Image from "next/image";

export default function PostsSection({
    posts,
    fetchPosts,
    onEdit,
    onCreate,
    viewMode,
    toggleView,
}) {
    // Handle delete
    const handleDelete = async (id) => {
        await fetch(`/api/posts/${id}`, { method: "DELETE" });
        fetchPosts();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="space-y-6">
            {/* Actions Bar */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Posts</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={onCreate}
                        className="bg-gray-400 hover:text-yellow-300 text-white p-2 rounded-lh cursor-pointer"
                    >
                        <PlusIcon size={25} strokeWidth={1} />
                    </button>

                    {/* Toggle View */}
                    <button
                        onClick={toggleView}
                        className="bg-gray-400 hover:text-yellow-300 text-white p-2 rounded-xl cursor-pointer"
                    >
                        {viewMode === "grid" ? <LayoutListIcon size={25} strokeWidth={1} /> : <LayoutGridIcon size={25} strokeWidth={1} />}
                    </button>
                </div>
            </div>

            {/* Posts List/Grid */}
            <div
                className={`grid gap-5 grid-cols-1 lg:grid-cols-2  
                    ${viewMode === "grid"
                        ? "xl:grid-cols-4 gap-4"
                        : ""
                    }`
                }
            >
                {posts.map((post) => (
                    <div
                        key={post._id}
                        className={`relative border border-gray-200 rounded-lg bg-white text-black overflow-hidden 
                            ${viewMode === "grid"
                                ? ""
                                : "flex gap-5"
                            }`
                        }
                    >
                        {post.imageUrl && (
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                 className={` object-cover rounded-lg 
                                    ${viewMode === "grid"
                                        ? "h-40 lg:h-60 w-full"
                                        : "w-full lg:w-1/3  h-40 lg:h-60"
                                    }`
                                }
                            />
                        )}
                        <div 
                            className={`p-5 flex flex-col justify-start
                                ${viewMode === "grid"
                                    ? ""
                                    : ""
                                }`
                            }
                        >
                            <h2 className="text-xl lg:text-2xl font-semibold mb-5">{post.title}</h2>
                            <p
                                className={`
                                    text-gray-600
                                    ${viewMode === "grid"
                                    ? "hidden"
                                    : "text-lg line-clamp-2"}  
                                `}
                                >
                                    {post.content}
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                                <p className="text-sm text-gray-600 flex items-center gap-3">
                                    <PenToolIcon size={20} strokeWidth={1} />
                                    {post.author}
                                </p>
                                <p className="text-sm text-gray-600 flex items-center gap-3">
                                    <ClockIcon size={20} strokeWidth={1} />
                                    {formatDate(post.createdAt)}
                                </p>
                            </div>
                        </div>
                        <div 
                            className={`absolute flex gap-3 
                                ${viewMode === "grid"
                                    ? "top-3 right-3"
                                    : "top-3 left-3"
                                }`
                            }    
                        >
                            <button
                                onClick={() => onEdit(post)}
                                className="p-2 bg-yellow-500 text-white rounded-lg"
                            >
                                <PencilLineIcon size={20} strokeWidth={1} />
                            </button>
                            <button
                                onClick={() => handleDelete(post._id)}
                                className="p-2 bg-red-600 text-white rounded-lg"
                            >
                                <DeleteIcon size={20} strokeWidth={1} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
