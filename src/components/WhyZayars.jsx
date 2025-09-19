"use client";
import { useEffect, useRef, useState } from "react";
import RangeSection from "./RangeSection";
import AOS from "aos";
import "aos/dist/aos.css";

const skills = [
    {
        title: "Global Reach",
        percent: 98,
        description: "Strong networks across Africa, Mimddle East, Europe and Asia.",
    },
    {
        title: "End-to-End Process Support",
        percent: 95,
        description: "From inquiry submission to deal closure-streamlined and transparent.",
    },
    {
        title: "Industry Expertise",
        percent: 97,
        description: "A dedicated team with years of experience in energy trading and logistics.",
    },
    {
        title: "Compliance & Verification",
        percent: 92,
        description: "Robust KYC and document checks to ensure secure, risk-free transactions.",
    },
];

export default function WhyZayars() {
    const skillsRef = useRef(null);
    const [startAnimation, setStartAnimation] = useState(false);
    const [percentages, setPercentages] = useState([0, 0, 0]); 

    useEffect(() => {
        AOS.init({ duration: 1000, easing: "ease-out-cubic" });

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => {
                        setStartAnimation(true);

                        skills.forEach((skill, idx) => {
                            let start = 0;
                            const increment = skill.percent / 100; // Adjust speed
                            const interval = setInterval(() => {
                                start += increment;
                                setPercentages((prev) => {
                                const newArr = [...prev];
                                newArr[idx] = Math.min(Math.round(start), skill.percent);
                                return newArr;
                                });
                                if (start >= skill.percent) clearInterval(interval);
                            }, 30);
                        });
                    }, 500); // Delay before animation starts
                    observer.disconnect(); // Run only once
                }
            },
            { threshold: 0.3 }
        );

        if (skillsRef.current) observer.observe(skillsRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section id="why-us" className="py-10 px-5 lg:p-20 bg-white border-t border-gray-300">
            <span className="slate text-black text-md lg:text-xl text-left">
                [Why Us]
            </span>
            <h2 className="text-black text-3xl xl:text-6xl font-light text-left mb-5 lg:mb-10">
                Why Zarays Energy?
            </h2>            
            <RangeSection
                skills={skills} 
                skillsRef={skillsRef} 
                startAnimation={startAnimation} 
                percentages={percentages}
            />
        </section>
    )
}