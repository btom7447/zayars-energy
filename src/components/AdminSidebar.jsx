"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { LogOut, Users, ShoppingBag, Settings, FileTextIcon, MailIcon, UsersIcon, ContactIcon } from "lucide-react";
import Image from "next/image";

export default function AdminSidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Blog", href: "/admin", icon: FileTextIcon },
        { name: "Contact", href: "/admin/contact", icon: ContactIcon },
        { name: "Newsletter", href: "/admin/newsletter", icon: MailIcon },
        { name: "Team", href: "/admin/team", icon: UsersIcon },
    ];

    return (
        <aside className="py-10 px-5 h-screen w-64 bg-blue-950 text-white flex flex-col">
            <div className="flex flex-col gap-5 items-center mb-10">
                <div className="m-auto bg-white rounded-full p-2">
                    <Image
                        src={"/logo.png"}
                        alt="Zayars Energy logo"
                        width={40}
                        height={40}
                        className="object-cover rounded-full"
                    />
                </div>
                <h6 className="text-center text-white text-2xl">Zayars Energy Admin</h6>
           </div>


            {/* Navigation */}
            <nav className="flex-1">
                <ul className="space-y-5 text-md">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3  transition ${
                                        isActive
                                        ? "font-bold"
                                        : "font-light"
                                    }`}
                                >
                                    <Icon size={20}   strokeWidth={isActive ? 2 : 1} />
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Sign Out */}
            <div className="">
                <button
                    onClick={() => signOut(auth)}
                    className="w-full flex items-center gap-3 cursor-pointer text-md"
                >
                    <div className="border border-white rounded-full p-2">
                        <LogOut size={20} strokeWidth={1} />
                    </div>
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
