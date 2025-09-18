"use client";
import { useState, useEffect } from "react";
import NavMenu from "./NavMenu";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [showFixedHeader, setShowFixedHeader] = useState(false);
    const [isOriginalOpen, setIsOriginalOpen] = useState(false);
    const [isFixedOpen, setIsFixedOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrolled(scrollY > 50);
            setShowFixedHeader(scrollY > 150);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close both menus when scrolling (optional)
    useEffect(() => {
        if (scrolled) {
            setIsOriginalOpen(false);
            setIsFixedOpen(false);
        }
    }, [scrolled]);

    return (
        <>
            {/* Original Header (absolute positioned over hero) */}
            <header
                className={`absolute top-0 left-0 z-40 w-full flex items-center justify-between px-5 lg:px-10 py-2 lg:py-5 border-b transition-all duration-300 ${
                    scrolled
                    ? "bg-white border-gray-200"
                    : "bg-transparent border-white"
                }`}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="Zayars Energy Logo"
                        width={24}
                        height={24}
                        className="w-12 lg:w-18 h-auto object-cover"
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
                    onClick={() => setIsOriginalOpen(!isOriginalOpen)}
                    className={`rounded-full p-3 lg:p-5 border cursor-pointer transition-colors ${
                    scrolled ? "border-blue-950 text-blue-950" : "border-white text-white"
                    }`}
                    aria-label="Toggle Menu"
                >
                    {isOriginalOpen ? (
                        <X size={20} />
                        ) : (
                        <Image
                            src={scrolled ? "/images/icons/menu-icon-two.png" : "/images/icons/menu-icon.png"}
                            alt="Menu Icon"
                            width={24}
                            height={24}
                            className="w-5 h-auto object-cover"
                        />
                    )}
                </button>

                {/* Navigation Menu */}
                <NavMenu isOpen={isOriginalOpen} setIsOpen={setIsOriginalOpen} />
            </header>

            {/* Fixed Header (slides down when scrolling) */}
            <header
                className={`fixed top-0 left-0 z-50 w-screen flex items-center justify-between px-5 lg:px-10 py-2 lg:py-5 border-b border-gray-200 bg-white shadow-md transition-transform duration-500 ${
                    showFixedHeader 
                    ? "translate-y-0" 
                    : "-translate-y-full"
                }`}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="Zayars Energy Logo"
                        width={24}
                        height={24}
                        className="w-12 lg:w-18 h-auto object-cover"
                    />
                    <p className="font-sans text-2xl text-blue-950">
                        Zayars Energy
                    </p>
                </Link>

                {/* Menu Button */}
                <button
                    onClick={() => setIsFixedOpen(!isFixedOpen)}
                    className="rounded-full p-3 lg:p-5 border border-blue-950 text-blue-950 cursor-pointer transition-colors"
                    aria-label="Toggle Menu"
                >
                    {isFixedOpen ? (
                        <X size={20} />
                        ) : (
                        <Image
                            src="/images/icons/menu-icon-two.png"
                            alt="Menu Icon"
                            width={24}
                            height={24}
                            className="w-5 h-auto object-cover"
                        />
                    )}
                </button>

                {/* Navigation Menu */}
                <NavMenu isOpen={isFixedOpen} setIsOpen={setIsFixedOpen} />
            </header>
        </>
    );
}