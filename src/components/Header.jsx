"use client";
import { useState, useEffect } from "react";
import NavMenu from "./NavMenu";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 50); // triggers after scrolling 50px
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 z-50 w-full flex items-center justify-between px-10 py-5 border-b transition-all duration-300 ${
                scrolled
                ? "bg-white border-gray-200 shadow-md translate-y-0"
                : "bg-transparent border-white translate-none"
            }`}
        >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src="/logo.png"
                    alt="Zayars Energy Logo"
                    width={24}
                    height={24}
                    className="w-18 h-auto object-cover"
                />
                <p
                    className={`font-sans text-2xl ${
                        scrolled ? "text-blue-950" : "text-white"
                    }`}
                >
                    Zayars Energy
                </p>
            </Link>

            {/* Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`rounded-full p-5 border cursor-pointer transition-colors ${
                scrolled ? "border-blue-950 text-blue-950" : "border-white text-white"
                }`}
                aria-label="Toggle Menu"
            >
                {isOpen ? (
                    <X size={20} />
                    ) : (
                    <Image
                        src={scrolled ? "/images/icons/menu-icon-two.png" : "/images/icons/menu-icon.png"}
                        alt="Menu Icon"
                        width={24}
                        height={24}
                        className="w-7 h-auto object-cover"
                    />
                )}
            </button>

            {/* Navigation Menu */}
            <NavMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </header>
    );
}
