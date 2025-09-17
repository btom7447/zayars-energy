"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // later: send to API or Formspree/Airtable
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
        className="p-7 rounded-2xl border border-gray-300 bg-white text-black text-xl md:text-2xl font-light placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="p-7 rounded-2xl border border-gray-300 bg-white text-black text-xl md:text-2xl font-light placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      {/* Message */}
      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        required
        rows={5}
        className="col-span-1 xl:col-span-2 p-7 rounded-2xl border border-gray-300 bg-white text-black text-xl md:text-2xl font-light placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      {/* Submit */}
      <button
        type="submit"
        className="col-span-1 xl:col-span-2 bg-blue-950 hover:bg-yellow-600 text-white p-7 rounded-2xl font-medium text-xl md:text-2xl transition-colors duration-300"
      >
        Submit
      </button>
    </form>
  );
}