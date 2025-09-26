"use client";

import { useState } from "react";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Message sent!");
        setFormData({ name: "", email: "", message: "" }); // reset form
      } else {
        toast.error(data.message || "⚠️ Something went wrong");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 xl:grid-cols-2 gap-5 w-full"
    >
      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="p-4 lg:p-7 rounded-2xl border border-gray-300 bg-white text-black text-lg md:text-2xl font-light placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="p-4 lg:p-7 rounded-2xl border border-gray-300 bg-white text-black text-lg md:text-2xl font-light placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      {/* Message */}
      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        required
        rows={5}
        className="col-span-1 xl:col-span-2 p-4 lg:p-7 rounded-2xl border border-gray-300 bg-white text-black text-lg md:text-2xl font-light placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="col-span-1 xl:col-span-2 flex items-center justify-center bg-blue-950 hover:bg-yellow-600 text-white p-4 lg:p-7 rounded-2xl font-medium text-xl md:text-2xl transition-colors duration-300"
      >
        {loading ? <MoonLoader size={20} color="#fff" /> : "Submit"}
      </button>
    </form>
  );
}