"use client";

import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

export default function CustomButton({
    children = "Get Started",
    variant = "white", // "white" | "black" | "gold"
    href, // 🔑 new prop for navigation
    ...props
    }) {
    const classes = clsx(
        "cssbuttons-io-button",
        variant === "white"
        ? "white-variant"
        : variant === "black"
        ? "black-variant"
        : "gold-variant"
    );

    // If href is provided → render as <Link>
    if (href) {
        return (
            <Link href={href} {...props} className={classes}>
                {children}
                <div className="icon">
                    <ArrowUpRight size={20} />
                </div>
            </Link>
        );
    }

    // Otherwise → fallback to <button>
    return (
        <button className={classes} {...props}>
            {children}
            <div className="icon">
                <ArrowUpRight size={20} />
            </div>
        </button>
    );
}