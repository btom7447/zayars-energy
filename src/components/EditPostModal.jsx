"use client";

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
      <div className="bg-white text-black p-6 rounded shadow-lg max-w-lg w-full space-y-4">
        <h2 className="text-xl font-semibold">Edit Post</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 w-full rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            placeholder="Content"
            className="border p-2 w-full rounded"
            rows="5"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <input
            type="text"
            placeholder="Author"
            className="border p-2 w-full rounded"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />

          <input type="file" onChange={handleUpload} />
          {uploading && <p className="text-yellow-600">Uploading...</p>}
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded"
            />
          )}

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
              className="px-4 py-2 bg-gray-400 rounded text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
