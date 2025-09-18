"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { DotIcon } from "lucide-react";

const processFlow = [
    {
        step: "01",
        title: "Submit Inquiry",
        text: "Share your needs through our inquiry form - product type, quantity, and destination.",
        image: "/images/process/submit-inquiry.png",
        points: [
        "Quick and simple form submission",
        "Provide accurate delivery details",
        "Tailored solutions from the start",
        ],
    },
    {
        step: "02",
        title: "KYC & Verification",
        text: "We carry out a standard compliance check to verify documentation and ensure trusted engagement.",
        image: "/images/process/kyc-verification.png",
        points: [
        "Thorough KYC checks",
        "Global compliance standards",
        "Protects both buyers & sellers",
        ],
    },
    {
        step: "03",
        title: "Buyer & Seller Matchmaking",
        text: "Using our network, we connect verified buyers and sellers with aligned requirements.",
        image: "/images/process/matchmaking.png",
        points: [
        "Access to trusted partners",
        "Faster deal alignment",
        "Reduced negotiation hurdles",
        ],
    },
    {
        step: "04",
        title: "Contracts",
        text: "We formalize agreements with NCNDA, IMFPA, and SPA to protect all parties and secure commissions.",
        image: "/images/process/contracts.png",
        points: [
        "Legally binding agreements",
        "Clear commission structure",
        "Full transparency guaranteed",
        ],
    },
    {
        step: "05",
        title: "Deal Closing & Commission",
        text: "Final negotiations are executed, deliveries arranged, and commissions settled transparently.",
        image: "/images/process/deal-closing.png",
        points: [
        "Secure delivery logistics",
        "Commission payout clarity",
        "Successful long-term relationships",
        ],
    },
];

export default function ProcessSection() {
    const [activeStep, setActiveStep] = useState(0);

    // Init AOS
    useEffect(() => {
        AOS.init({
        duration: 800,
        once: false,
        easing: "ease-in-out",
        });
    }, []);

    // Re-trigger AOS on step change
    useEffect(() => {
        AOS.refresh();
    }, [activeStep]);

    useEffect(() => {
        const handleScroll = () => {
        const section = document.getElementById("process");
            if (!section) return;

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollY = window.scrollY + window.innerHeight / 2;

            const progress = Math.min(
                Math.max((scrollY - sectionTop) / sectionHeight, 0),
                1
            );

            const stepIndex = Math.min(
                processFlow.length - 1,
                Math.floor(progress * processFlow.length)
            );
            setActiveStep(stepIndex);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section
            id="process"
            className="relative h-[600vh] xl:h-[300vh] bg-gray-100 py-10 px-5 lg:p-20" 
        >
            <h2 className="text-black text-3xl xl:text-6xl font-light text-center mb-5 lg:mb-10">
                How it Works
            </h2>

            {/* Sticky container */}
            <div className="sticky top-30 lg:top-50 h-[70dvh] xl:h-[60dvh] flex items-center justify-center">
                <div className="max-w-[900px] grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-40">
                {/* Text Section */}
                <div 
                    data-aos="fade-right" 
                    key={processFlow[activeStep]?.title}
                    className="relative"
                >
                    <span data-aos-delay="200" className="absolute -top-25 lg:-top-78 -left-0 xl:-left-60 text-8xl lg:text-[200px] font-bold text-outline">
                        {processFlow[activeStep]?.step}
                    </span>
                    <h3 data-aos-delay="500" className="text-black text-xl lg:text-5xl font-semibold mb-4">
                        {processFlow[activeStep]?.title}
                    </h3>
                    <p data-aos-delay="500" className="text-lg lg:text-2xl font-light text-gray-700 mb-5">
                        {processFlow[activeStep]?.text}
                    </p>
                    <ul data-aos-delay="700" className="list-none text-gray-700 space-y-2">
                        {processFlow[activeStep]?.points.map((point, idx) => (
                            <li key={idx} className="text-sm lg:text-2xl font-light flex items-center gap-2">
                                <DotIcon size={40} />
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Image Section */}
                <div
                    data-aos="fade-up"
                    key={processFlow[activeStep]?.image}
                    className="flex justify-center"
                >
                    <Image
                        src={processFlow[activeStep]?.image}
                        alt={processFlow[activeStep]?.title}
                        width={400}
                        height={400}
                        className="rounded-xl h-[140px] lg:h-[200px] object-cover"
                    />
                </div>
                </div>
            </div>
        </section>
    );
}
