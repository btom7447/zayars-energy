"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import CustomButton from "./CustomButton";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const heroSlides = [
    {
        image: "/images/hero/hero-one.png",
        secImage: "/images/hero/hero-tank-one.png",
        alt: "Clean Energy",
    },
    {
        image: "/images/hero/hero-two.png",
        secImage: "/images/hero/hero-tank-two.png",
        alt: "Solar Panels",
    },
    {
        image: "/images/hero/hero-one.png",
        secImage: "/images/hero/hero-tank-one.png",
        alt: "Clean Energy",
    },
];

export default function HeroSection() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-out",
            once: true,
        });
    }, []);

    return (
        <section id="home" className="relative w-full h-[80dvh] lg:h-[100dvh] overflow-hidden">
            <Splide
                options={{
                    type: "fade",
                    rewind: true,
                    autoplay: true,
                    interval: 4000,
                    arrows: false,
                    pagination: false,
                    speed: 1000,
                }}
                className="h-full"
            >
                {heroSlides.map((slide, index) => (
                    <SplideSlide key={index}>
                        <div className="relative w-full h-[80dvh] lg:h-[100dvh]">
                            {/* Background Image */}
                            <Image
                                src={slide.image}
                                alt={slide.alt}
                                fill
                                className="object-cover w-full h-full z-10 bg-black/80"
                                priority={index === 0} // preload first
                            />

                            {/* Secondary Image (pinned left bottom) */}
                            <div className="absolute bottom-0 left-0 z-50 w-[250px] md:w-[600px]">
                                <Image
                                    src={slide.secImage}
                                    alt={slide.alt}
                                    width={400}
                                    height={400}
                                    className="object-contain w-full h-auto"
                                />
                            </div>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>

            {/* Overlay Captions */}
            <div className="absolute inset-0 py-10 px-5 lg:p-20 flex flex-col items-end justify-center text-white">
                <h1
                    data-aos="fade-left"
                    data-aos-delay="300"
                    className="font-poppins text-yellow-300 text-4xl lg:text-[120px] font-extrabold mb-5 lg:mb-10"
                >
                    Global Energy
                </h1>

                <p
                    data-aos="fade-left"
                    data-aos-delay="600"
                    className="font-montserrat text-lg lg:text-2xl font-light mb-4 text-center"
                >
                    Elite brokerage service in crude oil, refined products, natural gas
                    and renewables.
                </p>

                <div
                    data-aos="fade-left"
                    data-aos-delay="900"
                    className="mt-10 flex flex-col lg:flex-row items-center gap-5 lg:gap-10"
                >
                    <CustomButton variant="white">Partner with Us</CustomButton>
                    <CustomButton variant="black">Make a Deal</CustomButton>
                </div>
            </div>
            
        </section>
    );
}