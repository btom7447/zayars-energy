"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { toast } from "react-toastify";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("We'll be in touch!");
        setEmail("");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="md:col-span-2 lg:col-span-2 xl:col-span-2"
    >
      <h6 className="text-2xl font-light text-blue-300 mb-5">Keep me Updated</h6>
      <div className="max-w-lg flex items-center justify-between rounded-full border border-gray-300 bg-white p-1">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="text-black text-lg md:text-xl xl:text-2xl font-light p-3 md:p-5 w-full focus:outline-none bg-transparent"
      />
      <button
        type="submit"
        disabled={loading}
        className="p-3 md:p-5 bg-yellow-500 text-blue-950 hover:bg-blue-950 hover:text-yellow-500 rounded-full cursor-pointer transition-colors duration-300 flex-shrink-0"
      >
        <ArrowUpRight size={25} strokeWidth={1} />
      </button>
      </div>
    </form>
  );
}
