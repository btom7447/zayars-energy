"use client";

import { useState } from "react";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import { ChevronDown } from "lucide-react";

const orgTypes = [
  "Energy Company",
  "Investor / VC",
  "Government Agency",
  "NGO / Non-Profit",
  "Technology Provider",
  "Others (Specify)",
];

const interests = [
  "Renewable Energy Projects",
  "Funding & Investment",
  "Smart Grid Solutions",
  "Pilot Programs",
  "Other",
];

function CustomSelect({ label, options, value, onChange, name }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative col-span-1">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4 lg:p-7 rounded-2xl border border-gray-300 bg-white text-black text-lg md:text-2xl font-light focus:outline-none focus:ring-1 focus:ring-yellow-500"
      >
        {value || label}
        <ChevronDown
          className={`ml-2 h-5 w-5 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul className="absolute z-10 w-full mt-2 rounded-2xl border border-gray-300 bg-white shadow-lg max-h-60 overflow-y-auto">
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => {
                onChange({ target: { name, value: option } });
                setOpen(false);
              }}
              className={`p-4 lg:p-6 cursor-pointer hover:bg-gray-100 text-gray-500 text-lg md:text-xl ${
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

export default function PartnerForm() {
  const [formData, setFormData] = useState({
    organization: "",
    email: "",
    phone: "",
    orgType: "",
    interest: "",
    message: "",
    agree: false,
    otherOrgType: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Partnership request submitted!");
        setFormData({
          organization: "",
          email: "",
          phone: "",
          orgType: "",
          interest: "",
          message: "",
          agree: false,
          otherOrgType: "",
        });
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
      {/* Organization Name */}
      <input
        type="text"
        name="organization"
        placeholder="Organization Name"
        value={formData.organization}
        onChange={handleChange}
        required
        className="p-4 lg:p-7 rounded-2xl border border-gray-300 bg-white text-black text-lg md:text-2xl font-light placeholder:text-black focus:outline-none focus:ring-1 focus:ring-yellow-500"
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        className="p-4 lg:p-7 rounded-2xl border border-gray-300 bg-white text-black text-lg md:text-2xl font-light placeholder:text-black focus:outline-none focus:ring-1 focus:ring-yellow-500"
      />

      {/* Phone (optional) */}
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number (Optional)"
        value={formData.phone}
        onChange={handleChange}
        className="p-4 lg:p-7 rounded-2xl border border-gray-300 bg-white text-black text-lg md:text-2xl font-light placeholder:text-black focus:outline-none focus:ring-1 focus:ring-yellow-500"
      />

      {/* Organization Type (custom select) */}
      <CustomSelect
        label="Select Organization Type"
        options={orgTypes}
        value={formData.orgType}
        onChange={handleChange}
        name="orgType"
      />

      {/* If "Others" selected → text input */}
      {formData.orgType === "Others (Specify)" && (
        <input
          type="text"
          name="otherOrgType"
          placeholder="Please specify"
          value={formData.otherOrgType}
          onChange={handleChange}
          className="xl:col-span-2 p-4 lg:p-7 rounded-2xl border border-gray-300 bg-white text-black text-lg md:text-2xl font-light placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
        />
      )}

      {/* Area of Interest (custom select) */}
      <div className="xl:col-span-2">
        <CustomSelect
          label="Select Area of Interest"
          options={interests}
          value={formData.interest}
          onChange={handleChange}
          name="interest"
        />
      </div>

      {/* Message */}
      <textarea
        name="message"
        placeholder="Your Message / Proposal"
        value={formData.message}
        onChange={handleChange}
        required
        rows={5}
        className="col-span-1 xl:col-span-2 p-4 lg:p-7 rounded-2xl border border-gray-300 bg-white text-black text-lg md:text-2xl font-light placeholder:text-black focus:outline-none focus:ring-1 focus:ring-yellow-500"
      />

      {/* Checkbox */}
      <label className="col-span-1 xl:col-span-2 flex items-center gap-3 text-gray-600 text-lg md:text-2xl">
        <input
          type="checkbox"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
          required
          className="w-6 h-6 accent-yellow-500"
        />
        I agree to the terms and conditions
      </label>

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
