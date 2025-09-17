"use client";

import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";

export default function CustomButton({
    children = "Get Started",
    variant = "white", // "white" or "black"
    ...props
}) {
    return (
        <button
            className={clsx(
                "cssbuttons-io-button",
                variant === "white"
                    ? "white-variant"
                    : variant === "black"
                        ? "black-variant"
                        : "gold-variant"
            )}
        {...props}
        >
            {children}
            <div className="icon">
                <ArrowUpRight size={20} />
            </div>
        </button>
    );
}
