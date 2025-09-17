"use client";

import CountUp from "react-countup";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const servicesSlide = [
    { title: "Transactions Facilitated", value: 150 },
    { title: "Partnerships", value: 10 },
    { title: "Global Presence", value: 15 },
    { title: "Years of Expertise", value: 10 },
];

export default function MetricsSection() {
    useEffect(() => {
        // Initialize AOS if not already initialized
        if (typeof window !== 'undefined' && !window.AOS) {
            AOS.init({
                duration: 800,
                easing: 'ease-out',
                once: true,
                offset: 100
            });
        }
    }, []);

    return (
        <section className="bg-gray-100 border-y border-gray-300 p-10 lg:p-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {servicesSlide.map((metric, index) => (
                    <div 
                        key={index} 
                        className="flex flex-col items-center"
                        data-aos="fade-up"
                        data-aos-delay={index * 200} // Staggered delay: 0ms, 100ms, 200ms, 300ms
                    >
                        <span className="text-4xl lg:text-7xl text-black">
                            <CountUp
                                end={metric.value}
                                duration={2.5}
                                separator=","
                                className=""
                            />
                            +
                        </span>
                        <p className="text-2xl text-black font-light mt-2">{metric.title}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}