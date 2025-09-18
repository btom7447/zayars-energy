"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";


const servicesSlide = [
  {
    title: "Brokerage",
    text: "We specialize in facilitating secure and fully compliant transactions across the global energy sector. Our brokerage services connect vetted buyers and sellers of crude oil, diesel, jet fuel, LNG, and LPG, ensuring transparency and efficiency in every deal. By leveraging our extensive industry network and due diligence processes, we streamline negotiations and create reliable trading partnerships that deliver real value."
  },
  {
    title: "Advisory & Market Intelligence",
    text: "In an industry where timing and accuracy are critical, we provide clients with data-driven insights and strategic advisory support to make confident trading decisions. From market trends and pricing forecasts to deal structuring and negotiation strategies, our team of experts helps clients navigate complex market dynamics. We combine deep industry knowledge with actionable intelligence, ensuring that every move is informed, timely, and aligned with long-term business goals."
  },
  {
    title: "Logistics & Storage Support",
    text: "Efficient logistics and reliable storage are the backbone of successful energy trading. Through strong partnerships with tank farms, refineries, and international shipping providers, we help clients optimize the movement and storage of energy products. Our team manages the complexities of supply chain coordination, ensuring timely delivery and secure storage while minimizing risks and operational bottlenecks. This end-to-end support allows clients to focus on trading while we handle the logistics."
  },
  {
    title: "Trade Finance Support",
    text: "Energy deals often require robust financial structures to ensure security and trust. We guide clients through the complexities of trade finance, offering expertise in letters of credit, escrow services, and tailored payment structures. By working closely with trusted financial institutions, we help de-risk transactions, provide greater certainty of payment, and build confidence between all parties involved. Our goal is to make financing as seamless as the trade itself."
  },
  {
    title: "Risk Management",
    text: "In global energy trading, mitigating risk is essential. Our risk management services cover every critical aspect, from full KYC and AML verification to the drafting of enforceable legal contracts such as NCNDAs, IMFPAs, and SPAs. We place compliance and transparency at the center of every transaction, ensuring that all parties are protected from legal, financial, and operational risks. By safeguarding the integrity of each deal, we create an environment of trust and accountability."
  }
];


export default function ServicesSection() {
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
        <section id="services" className="py-10 px-5 lg:p-20 bg-gray-100">
            <h2 className="text-black text-3xl xl:text-6xl font-light text-center mb-5 lg:mb-10"
                data-aos="fade-down"
                data-aos-delay="100"
            >
                What We Offer
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-16 items-center">
                {/* Splide Carousel */}
                <Splide
                    options={{
                        type: "fade",
                        rewind: true,
                        autoplay: true,
                        interval: 5000,
                        arrows: true,
                        pagination: false,
                        speed: 800,
                    }}
                    className="xl:col-span-2"
                >
                    {servicesSlide.map((slide, index) => (
                        <SplideSlide key={index}>
                            <div className="px-0 lg:px-30">
                                <h5 
                                    className="slate text-primary text-xl lg:text-7xl font-semibold mb-5 text-blue-950 text-heading"
                                    data-aos="fade-right"
                                    data-aos-delay="200"
                                >
                                    {slide.title}
                                </h5>
                                <p 
                                    className="text-gray-600 font-light text-sm lg:text-2xl leading-relaxed"
                                    data-aos="fade-up"
                                    data-aos-delay="400"
                                >
                                    {slide.text}
                                </p>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>

                {/* Poster Image */}
                <div className="relative w-full h-[200px] rounded-xl overflow-hidden"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                >
                    <Image 
                        src="/images/service-poster.png"
                        alt="a picture of a brokerage deal"
                        fill
                        className="object-cover rounded-3xl"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
