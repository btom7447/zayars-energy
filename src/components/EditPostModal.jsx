"use client";

import { XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function EditPostModal({ post, onClose, refreshPosts }) {
    const [form, setForm] = useState({ ...post });
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`/api/posts/${post._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        refreshPosts();
        onClose();
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        if (data.url) setForm((prev) => ({ ...prev, imageUrl: data.url }));
        setUploading(false);
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white text-black p-5 rounded-3xl shadow-lg max-w-7xl w-[90%] max-h-[90%] overflow-y-auto space-y-4">
                <div className="flex items-center justify-between gap-10">
                    <h2 className="text-2xl font-semibold">Edit Post</h2>
                    <button type="button"
                        className="text-black cursor-pointer"
                        onClick={onClose}
                    >
                        <XIcon size={25} strokeWidth={1} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="mb-5">
                        <label
                            htmlFor="photo"
                            className="block text-xl font-semibold text-gray-800 mb-2"
                        >
                            Photo
                        </label>
                        <input 
                            id="photo"
                            type="file" onChange={handleUpload} />

                            {uploading && <MoonLoader color="#1d4ed8" size={60} /> }
                            {form.imageUrl && (
                                <img
                                    src={form.imageUrl}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-3xl"
                                />
                            )}
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="title"
                            className="block text-xl font-semibold text-gray-800 mb-2"
                        >
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Title"
                            className="w-full p-4 lg:p-7 rounded-2xl border border-gray-300 bg-white text-black text-lg md:text-2xl font-light placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="title"
                            className="block text-xl font-semibold text-gray-800 mb-2"
                        >
                            Content
                        </label>
                        <textarea
                            id="content"
                            placeholder="Content"
                            className="w-full p-4 lg:p-7 rounded-2xl border border-gray-300 bg-white text-black text-lg md:text-2xl font-light placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            rows="5"
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="author"
                            className="block text-xl font-semibold text-gray-800 mb-2"
                        >
                            Author
                        </label>
                        <input
                            id="author"
                            type="text"
                            placeholder="Author"
                            value={form.author}
                            onChange={(e) => setForm({ ...form, author: e.target.value })}
                            className="w-full p-4 lg:p-7 rounded-2xl border border-gray-300 bg-white text-black text-lg md:text-2xl font-light placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        />
                    </div>

                    {/* ✅ Published toggle */}
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={form.published}
                            onChange={(e) =>
                                setForm({ ...form, published: e.target.checked })
                            }
                        />
                        <span>Published</span>
                    </label>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-5 px-5 bg-gray-400 hover:bg-gray-700 text-white rounded-xl font-medium transition cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-5 px-5 bg-blue-950 hover:bg-blue-800 text-white rounded-xl font-medium transition cursor-pointer"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
