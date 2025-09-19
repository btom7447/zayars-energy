"use client";

import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function AboutSection() {
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
        <section id="about-us" className="py-10 px-5 lg:p-20 bg-white grid grid-cols-1 xl:grid-cols-2 items-center gap-10 lg:gap-20">
            <div className="">
                <h2 
                    data-aos="fade-right"
                    data-aos-delay="100"
                    className="text-black text-3xl xl:text-6xl font-light text-left mb-5 lg:mb-10"
                >
                    Who <br />
                    <span className="text-md lg:text-xl">[About Us]</span>
                    We Are
                </h2>
                <div 
                    data-aos="zoom-in"
                    data-aos-delay="200"
                    className="mt-10 relative w-full h-50 lg:h-80"
                >
                    <Image
                        src="/images/about-img.png"
                        alt="a picture of board meeting at zayar"
                        fill
                        className="object-cover rounded-3xl"
                    />
                </div>
            </div>
            <div>
                <p 
                    data-aos="fade-left"
                    data-aos-delay="300"
                    className="text-xl lg:text-2xl text-black font-extralight"
                >
                    "Driving the future of global energy trade build a secure bridge between energy supply and demand"
                </p>
                <span 
                    data-aos="fade-left"
                    data-aos-delay="400"
                    className="signature text-3xl lg:text-5xl text-yellow-600 block mt-5"
                >
                    Wisdom Nwachukwu
                </span>
                <h6 
                    data-aos="fade-left"
                    data-aos-delay="500"
                    className="text-black text-2xl uppercase mt-2"
                >
                    CEO
                </h6>
                <div 
                    className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-10"
                >
                    <div className="flex flex-col items-center"
                        data-aos="fade-up"
                        data-aos-delay="600"
                    >
                        <Image 
                            src="/images/icons/transparency-icon.png"
                            alt="transparency icon"
                            width={20}
                            height={20}
                            className="w-7 h-7 object-cover"
                        />
                        <p className="text-black text-sm lg:text-xl mt-2">Transparency</p>
                    </div>
                    <div className="flex flex-col items-center"
                        data-aos="fade-up"
                        data-aos-delay="700"
                    >
                        <Image 
                            src="/images/icons/speed-icon.png"
                            alt="speed icon"
                            width={20}
                            height={20}
                            className="w-7 h-7 object-cover"
                        />
                        <p className="text-black text-sm lg:text-xl mt-2">Speed</p>
                    </div>
                    <div className="flex flex-col items-center"
                        data-aos="fade-up"
                        data-aos-delay="800"
                    >
                        <Image 
                            src="/images/icons/compliance-icon.png"
                            alt="compliance icon"
                            width={20}
                            height={20}
                            className="w-7 h-7 object-cover"
                        />
                        <p className="text-black text-sm lg:text-xl mt-2">Compliance</p>
                    </div>
                    <div className="flex flex-col items-center"
                        data-aos="fade-up"
                        data-aos-delay="900"
                    >
                        <Image 
                            src="/images/icons/excellence-icon.png"
                            alt="excellence icon"
                            width={20}
                            height={20}
                            className="w-7 h-7 object-cover"
                        />
                        <p className="text-black text-sm lg:text-xl mt-2">Excellence</p>
                    </div>
                </div>
            </div>
        </section>
    )
}