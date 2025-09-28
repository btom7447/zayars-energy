"use client";

import { useState } from "react";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail, 
    signOut 
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import PasswordInput from "./PasswordInput";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { MoonLoader } from "react-spinners";

export default function AuthForm() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState("login"); // "login" | "signup" | "forgot"

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const checkAdminAccess = async (email) => {
        try {
            const res = await fetch("/api/team");
            const data = await res.json();
            const admin = data.find(member => member.email === email && member.adminAccess === true);
            return !!admin;
        } catch (error) {
            console.error("❌ Error checking admin access:", error);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.email.endsWith("@zayarsenergy.com")) {
            toast.error("Only company emails are allowed!");
            setLoading(false);
            return;
        }

        try {
            if (mode === "login") {
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
                const hasAccess = await checkAdminAccess(formData.email);

                if (!hasAccess) {
                    await signOut(auth);
                    toast.error("You do not have admin access!");
                } else {
                    toast.success("Welcome back!");
                }

            } else if (mode === "signup") {
                const userCred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                // After signup, check admin access
                const hasAccess = await checkAdminAccess(formData.email);

                if (!hasAccess) {
                    await signOut(auth);
                    toast.error("You do not have admin access!");
                } else {
                    toast.success("Account created successfully!");
                }

            } else if (mode === "forgot") {
                await sendPasswordResetEmail(auth, formData.email);
                toast.success("Password reset email sent!");
            }
        } catch (error) {
            console.error("❌ Auth error:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 w-full max-w-md bg-white"
        >
            <div className="m-auto border border-gray-300 rounded-full p-2">
                <Image
                    src={"/logo.png"}
                    alt="Zayars Energy logo"
                    width={40}
                    height={40}
                    className="object-cover rounded-full"
                />
            </div>

            <h2 className="text-3xl lg:text-5xl text-black font-semibold text-center">
                {mode === "login" && "Welcome"}
                {mode === "signup" && "Create Account"}
                {mode === "forgot" && "Reset Password"}
            </h2>

            <p className="text-xl text-black text-center">
                {mode === "login" && "Please login to admin dashboard"}
                {mode === "signup" && "Sign up with your company email"}
                {mode === "forgot" && "Enter your email to reset password"}
            </p>

            <div className="my-5 flex flex-col gap-5 w-full">
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="@zayarsenergy.com"
                    required
                    className="w-full p-4 rounded-xl border border-gray-300 bg-white text-black text-lg md:text-xl focus:outline-none focus:ring-1 focus:ring-yellow-500"
                />

                {(mode === "login" || mode === "signup") && (
                    <PasswordInput
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                )}

                {mode === "login" && (
                    <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-black text-md text-right cursor-pointer"
                    >
                        Forgotten password?
                    </button>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer w-full flex justify-center bg-blue-950 hover:bg-yellow-600 text-white p-4 rounded-xl font-medium text-lg md:text-xl transition-colors duration-300"
                >
                    {loading
                        ?  <MoonLoader size={15} color="#fff" /> 
                        : mode === "login"
                        ? "Sign In"
                        : mode === "signup"
                        ? "Sign Up"
                        : "Send Reset Email"}
                </button>
            </div>

            <div className="flex flex-col items-center gap-2 text-md text-black">
                {mode === "forgot" && (
                    <p>
                        Back to{" "}
                        <button
                            type="button"
                            onClick={() => setMode("login")}
                            className="underline cursor-pointer"
                        >
                            Log in
                        </button>
                    </p>
                )}
                {mode === "login" && (
                    <p>
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => setMode("signup")}
                            className="underline cursor-pointer"
                        >
                            Sign up
                        </button>
                    </p>
                )}
                <Link href={"/"} className="mt-5 underline text-left">
                    Go back to homepage?
                </Link>
            </div>
        </form>
    );
}
