"use client";

import CountUp from "react-countup";
import { useEffect, useState, useRef } from "react";
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
        <section className="bg-gray-100 border-y border-gray-300 py-10 px-5 lg:p-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {servicesSlide.map((metric, index) => (
                    <MetricItem 
                        key={index} 
                        metric={metric} 
                        index={index} 
                    />
                ))}
            </div>
        </section>
    );
}

function MetricItem({ metric, index }) {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5, rootMargin: '-50px 0px' }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div 
            ref={ref}
            className="flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay={index * 200}
        >
            <span className="text-4xl lg:text-7xl text-black">
                {isInView ? (
                    <CountUp
                        end={metric.value}
                        duration={2.5}
                        separator=","
                        delay={0.3}
                    />
                ) : (
                    "0"
                )}
                +
            </span>
            <p className="text-sm lg:text-2xl text-black font-light mt-2">{metric.title}</p>
        </div>
    );
}