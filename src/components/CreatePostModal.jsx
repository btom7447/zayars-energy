"use client";

import { XIcon } from "lucide-react";
import { useState } from "react";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function CreatePostModal({ onClose, refreshPosts }) {
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    imageUrl: "",
    published: false, // 👈 include published
  });
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Post created successfully!");
        refreshPosts();
        onClose();
      } else {
        toast.error("Failed to create post");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) setForm((prev) => ({ ...prev, imageUrl: data.url }));
    setUploading(false);
  };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="p-5 bg-white text-black rounded-3xl shadow-lg max-w-9xl w-[90%] max-h-[90%] flex flex-col">
                {/* Header */}
                <div className="px-5 pt-5 flex items-center justify-between gap-10 mb-4 flex-shrink-0">
                    <h2 className="text-2xl font-semibold">Edit Post</h2>
                    <button type="button" className="text-black cursor-pointer" onClick={onClose}>
                        <XIcon size={25} strokeWidth={1} />
                    </button>
                </div>

                {/* Scrollable content */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-3 p-5">
                
                    {/* Image upload */}
                    <div className="mb-5">
                        <label
                            htmlFor="photo"
                            className="block text-xl font-semibold text-gray-800 mb-2"
                        >
                            Photo
                        </label>
                        {uploading && (
                            <div className="m-10">
                                <MoonLoader color="#1d4ed8" size={20} /> 
                            </div>
                        )}
                        {form.imageUrl && (
                            <img
                                src={form.imageUrl}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded-3xl"
                            />
                        )}
                        <input 
                            id="photo"
                            type="file" onChange={handleUpload} 
                            className="mt-3 p-3 w-45 border border-gray-300 rounded-xl cursor-pointer"
                        />
                    </div>

                    {/* Title */}
                    <div className="mb-5">
                        <label htmlFor="title" className="block text-xl font-semibold text-gray-800 mb-2">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Title"
                            className="w-full p-3 rounded-xl border border-gray-300 bg-white text-black text-lg font-light placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                        />
                    </div>

                    {/* Content */}
                    <div className="mb-5">
                        <label htmlFor="content" className="block text-xl font-semibold text-gray-800 mb-2">
                            Content
                        </label>
                        <textarea
                            id="content"
                            placeholder="Content"
                            className="w-full p-3 rounded-xl border border-gray-300 bg-white text-black text-lg font-light placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                            rows="5"
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                        />
                    </div>

                    {/* Author */}
                    <div className="mb-5">
                        <label htmlFor="author" className="block text-xl font-semibold text-gray-800 mb-2">
                            Author
                        </label>
                        <input
                            id="author"
                            type="text"
                            placeholder="Author"
                            value={form.author}
                            onChange={(e) => setForm({ ...form, author: e.target.value })}
                            className="w-full p-3 rounded-xl border border-gray-300 bg-white text-black text-lg font-light placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Published toggle */}
                    <div className="mb-5">
                        <label htmlFor="published" className="block text-xl font-semibold text-gray-800 mb-2">
                            Publish
                        </label>
                        <input
                            id="published"
                            type="checkbox"
                            checked={form.published}
                            onChange={(e) => setForm({ ...form, published: e.target.checked })}                        
                        />
                    </div>

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
                            disabled={uploading}
                            className="py-3 px-5 flex items-center bg-blue-950 hover:bg-blue-800 text-white rounded-xl font-medium transition cursor-pointer"
                        >
                            {uploading ? <MoonLoader size={20} color="#fff" /> : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}