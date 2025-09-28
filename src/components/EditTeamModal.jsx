"use client";

import { useState } from "react";
import { XIcon } from "lucide-react";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import ToggleSwitch from "./ToggleSwitch";

export default function EditTeamModal({ onClose, onSubmit, member }) {
    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState({
        fullName: member?.fullName || "",
        email: member?.email || "",
        role: member?.role || "",
        title: member?.title || "",
        twitterHandle: member?.twitter || "",
        linkedinHandle: member?.linkedin || "",
        photoUrl: member?.photoUrl || "",
        bio: member?.bio || "",
        adminAccess: member?.adminAccess || false,
        visible: member?.visible ?? true,
    });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleToggleChange = (name, checked) => {
    setForm((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (data.url) setForm((prev) => ({ ...prev, photoUrl: data.url }));
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Photo upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
        const payload = {
            fullName: form.fullName,
            email: form.email,
            role: form.role,
            title: form.title,
            twitter: form.twitterHandle,
            linkedin: form.linkedinHandle,
            bio: form.bio,
            adminAccess: form.adminAccess,
            visible: form.visible,
            photoUrl: form.photoUrl || null,
        };

        const res = await fetch(`/api/team/${member._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to update team member");

        const data = await res.json();
        toast.success("Team member updated successfully!");
        onSubmit(data.data); // update parent state
        onClose();
    } catch (err) {
        console.error(err);
        toast.error("Error updating team member. Please try again.");
    } finally {
        setUploading(false);
    }
};


  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="p-5 bg-white text-black rounded-3xl shadow-lg max-w-9xl w-[90%] max-h-[90%] flex flex-col">
        {/* Header */}
        <div className="px-5 pt-5 flex items-center justify-between gap-10 mb-4 flex-shrink-0">
          <h2 className="text-2xl font-semibold">Add Team Member</h2>
          <button type="button" className="text-black cursor-pointer" onClick={onClose}>
            <XIcon size={25} strokeWidth={1} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 grid gap-5 grid-cols-1 lg:grid-cols-2 overflow-y-auto space-y-3 p-5"
        >
          {/* Photo Upload */}
          <div className="mb-5 col-span-2">
            <label htmlFor="photo" className="block text-xl font-semibold text-gray-800 mb-2">
              Photo
            </label>
            {uploading && (
              <div className="m-10">
                <MoonLoader color="#1d4ed8" size={20} />
              </div>
            )}
            {form.photoUrl && (
              <img
                src={form.photoUrl}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-3xl mb-2"
              />
            )}
            <input
              id="photo"
              type="file"
              onChange={handleUpload}
              className="mt-3 p-3 w-45 border border-gray-300 rounded-xl cursor-pointer"
            />
          </div>

          {/* Bio */}
          <div className="mb-5 col-span-2">
            <label htmlFor="bio" className="block text-xl font-semibold text-gray-800 mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white text-black text-lg font-light placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              rows={4}
            />
          </div>

          {/* Full Name */}
          <div className="mb-5">
            <label htmlFor="fullName" className="block text-xl font-semibold text-gray-800 mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white text-black text-lg font-light placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-xl font-semibold text-gray-800 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="@zayarsenergy.com"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white text-black text-lg font-light placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              required
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
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white text-black text-lg font-light placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Role */}
          <div className="mb-5">
            <label htmlFor="role" className="block text-xl font-semibold text-gray-800 mb-2">
              Role
            </label>
            <input
              id="role"
              type="text"
              name="role"
              placeholder="Role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white text-black text-lg font-light placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Social Links */}
          <div className="mb-5">
            <label htmlFor="twitter" className="block text-xl font-semibold text-gray-800 mb-2">
              Twitter
            </label>
            <input
              id="twitter"
              type="text"
              name="twitterHandle"
              placeholder="https://twitter.com/username"
              value={form.twitterHandle}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white text-black text-lg font-light placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="linkedin" className="block text-xl font-semibold text-gray-800 mb-2">
              LinkedIn
            </label>
            <input
              id="linkedin"
              type="text"
              name="linkedinHandle"
              placeholder="https://linkedin.com/in/username"
              value={form.linkedinHandle}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-300 bg-white text-black text-lg font-light placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />
          </div>

          {/* Admin Access & Visible */}
          <div className="flex items-center gap-15">
            <div className="mb-5">
              <label htmlFor="admin" className="block text-xl font-semibold text-gray-800 mb-2">
                Admin Access
              </label>
              <ToggleSwitch
                id="adminAccess"
                name="adminAccess"
                checked={form.adminAccess}
                onChange={(e) => handleToggleChange('adminAccess', e.target.checked)}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="visible" className="block text-xl font-semibold text-gray-800 mb-2">
                Visible on Site
              </label>
              <ToggleSwitch
                id="visible"
                name="visible"
                checked={form.visible}
                onChange={(e) => handleToggleChange('visible', e.target.checked)}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="span-col-2 w-full flex justify-end gap-3 mt-10">
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
