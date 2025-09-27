"use client";

import AuthForm from "@/components/AuthForm";
import Image from "next/image";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

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
        Loading...
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
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
