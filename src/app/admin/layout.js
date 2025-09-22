"use client";

import Image from "next/image";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      setAuthorized(true);
    } else {
      alert("Wrong password!");
    }
  };

  if (!authorized) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen bg-white z-50 flex flex-col lg:flex-row">
        {/* Mobile: Background image wrapper */}
        <div className="relative w-full h-full lg:w-2/3 lg:h-screen">
          <Image
            src={"/images/admin-bg.jpg"}
            alt="admin background poster"
            fill
            priority
            className="object-cover"
          />

          {/* Overlay with form (only on mobile) */}
          <div className="absolute inset-0 flex items-center justify-center p-6 lg:hidden bg-black/40">
            <form
              onSubmit={handleLogin}
              className="bg-white/90 p-8 rounded-xl shadow-md space-y-5 w-full max-w-sm"
            >
              <h1 className="text-xl font-semibold text-center">Admin Login</h1>
              <input
                type="password"
                className="border p-3 w-full rounded text-black focus:ring focus:ring-blue-300"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded font-medium transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>

            {/* Desktop Form Section */}
            <div className="hidden lg:flex h-screen w-1/3 items-center justify-center p-10 bg-white">
                    <form
                        onSubmit={handleLogin}
                        className="bg-white border border-gray-300 p-10 rounded-lg shadow-md lg:shadow-none space-y-5 w-full"
                    >
                        <h1 className="text-black text-3xl font-light text-center mb-10">Zayars Energy</h1>
                        <h3 className="text-black text-xl text-center mb-10">Login</h3>
                        <input
                            type="password"
                            className="border p-4 w-full rounded-lg text-black border-gray-300 focus:ring focus:ring-gray-200 outline-yellow-300"
                            placeholder="Enter admin password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-blue-950 hover:bg-blue-700 text-white w-full py-4 rounded font-medium transition cursor-pointer"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
