"use client";

import AuthForm from "@/components/AuthForm";
import Image from "next/image";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import { AnimatePresence, motion } from "framer-motion";
import { MoonLoader } from "react-spinners";

export default function AdminLayout({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthorized(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <MoonLoader color="#1d4ed8" size={40} /> 
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="fixed inset-0 z-50 bg-white grid grid-cols-1 xl:grid-cols-3 overflow-y-auto">
        {/* Poster Section */}
        <div className="xl:col-span-2 relative w-full h-64 lg:h-screen">
          <Image
            src="/images/admin-bg.jpg"
            alt="admin background poster"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col items-center justify-center w-full p-5 py-15 bg-white">
          <div className="w-full max-w-md">
            <AuthForm />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="flex h-screen">
        {/* Sidebar (desktop) */}
        <div className="hidden lg:block">
          <AdminSidebar />
        </div>

        <AnimatePresence>
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black"
                onClick={() => setSidebarOpen(false)}
              />

              {/* Sidebar */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="relative z-50 w-64 h-full bg-blue-950"
              >
                <AdminSidebar onClose={() => setSidebarOpen(false)} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        
        {/* Main content */}
        <main className="flex-1 pb-20 bg-gray-50 overflow-y-auto">
          <AdminHeader sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          {children}
        </main>
      </div>
    </div>
  );
}
