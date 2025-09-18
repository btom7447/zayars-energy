"use client";

import { CheckIcon } from "lucide-react";
import ContactForm from "./ContactForm";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ContactSection() {
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
        <section className="py-10 px-5 lg:p-20 bg-blue-50">
            <h2 
                className="text-black text-3xl xl:text-6xl font-light text-left mb-5 lg:mb-10"
                data-aos="fade-right"
                data-aos-delay="100"
            >
                Any Question?
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <div>
                    <p 
                        className="max-w-xl text-black text-lg lg:text-2xl font-light"
                        data-aos="fade-right"
                        data-aos-delay="200"
                    >
                        Have any question or need assistance?
                        Reach out to our dedicated support team, We're here to help with any inquiries you may have.
                    </p>
                    <ul className="my-10 space-y-5">
                        <li 
                            className="text-sm lg:text-2xl text-black font-light flex items-center gap-3"
                            data-aos="fade-right"
                            data-aos-delay="300"
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-200 text-blue-950 flex items-center justify-center">
                                <CheckIcon size={20} />
                            </div>
                            Personalized Assistance
                        </li>
                        <li 
                            className="text-sm lg:text-2xl text-black font-light flex items-center gap-3"
                            data-aos="fade-right"
                            data-aos-delay="400"
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-200 text-blue-950 flex items-center justify-center">
                                <CheckIcon size={20} />
                            </div>
                            Timely Response
                        </li>
                        <li 
                            className="text-sm lg:text-2xl text-black font-light flex items-center gap-3"
                            data-aos="fade-right"
                            data-aos-delay="500"
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-200 text-blue-950 flex items-center justify-center">
                                <CheckIcon size={20} />
                            </div>
                            Comprehensive Support
                        </li>
                    </ul>

                    <ul 
                        className="flex items-center gap-5 list-none"
                        data-aos="fade-up"
                        data-aos-delay="600"
                    >
                        <li className="p-3 lg:p-5 rounded-full border border-gray-300 bg-white">
                            <a
                                href="https://external-website.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black"
                            >
                                <Image 
                                    src="/images/icons/x-icon.png"
                                    alt="X (Twitter) icon"
                                    width={10}
                                    height={10}
                                    className="w-5 lg:w-7 h-5 lg:h-7 object-contain"
                                />
                            </a>
                        </li>
                        <li className="p-3 lg:p-5 rounded-full border border-gray-300 bg-white">
                            <a
                                href="https://external-website.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black"
                            >
                                <Image 
                                    src="/images/icons/instagram-icon.png"
                                    alt="Instagram icon"
                                    width={10}
                                    height={10}
                                    className="w-5 lg:w-7 h-5 lg:h-7 object-contain"
                                />
                            </a>
                        </li>
                        <li className="p-3 lg:p-5 rounded-full border border-gray-300 bg-white">
                            <a
                                href="https://external-website.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black"
                            >
                                <Image 
                                    src="/images/icons/web-icon.png"
                                    alt="Website icon"
                                    width={10}
                                    height={10}
                                    className="w-5 lg:w-7 h-5 lg:h-7 object-contain"
                                />
                            </a>
                        </li>
                    </ul>
                </div>

                <div data-aos="fade-left" data-aos-delay="700">
                    <ContactForm />
                </div>
            </div>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                {/* Email Us */}
                <div 
                    className="p-5 rounded-2xl flex flex-col items-start border border-gray-300 bg-white cursor-pointer"
                    data-aos="fade-up"
                    data-aos-delay="800"
                >
                    <div>
                        <div className="bg-blue-950 p-3 w-fit rounded-full mb-0 lg:mb-5 flex items-center">
                            <Image 
                                src="/images/icons/mail-icon.png"
                                alt="Email icon"
                                width={10}
                                height={10}
                                className="w-5 lg:w-7 h-5 lg:h-7 object-contain"
                            />
                        </div>
                        <h6 className="font-semibold text-lg lg:text-2xl text-blue-950">Email Us</h6>
                        <p className="text-sm lg:text-2xl font-light text-black">info@zayersenergy.com</p>
                    </div>
                </div>
                {/* Call Us */}
                <div 
                    className="p-5 rounded-2xl flex flex-col items-start border border-gray-300 bg-white cursor-pointer"
                    data-aos="fade-up"
                    data-aos-delay="900"
                >
                    <div>
                        <div className="bg-blue-950 p-3 w-fit rounded-full mb-0 lg:mb-5 flex items-center">
                            <Image 
                                src="/images/icons/call-icon.png"
                                alt="Email icon"
                                width={10}
                                height={10}
                                className="w-5 lg:w-7 h-5 lg:h-7 object-contain"
                            />
                        </div>
                        <h6 className="font-semibold text-lg lg:text-2xl text-blue-950">Call Us</h6>
                        <p className="text-sm lg:text-2xl font-light text-black">+234 5678 9100</p>
                    </div>
                </div>
                {/* Visit Us */}
                <div 
                    className="p-5 rounded-2xl flex flex-col items-start border border-gray-300 bg-white cursor-pointer"
                    data-aos="fade-up"
                    data-aos-delay="1000"
                >
                    <div>
                        <div className="bg-blue-950 p-3 w-fit rounded-full mb-0 lg:mb-5 flex items-center">
                            <Image 
                                src="/images/icons/pin-icon.png"
                                alt="Email icon"
                                width={10}
                                height={10}
                                className="w-5 lg:w-7 h-5 lg:h-7 object-contain"
                            />
                        </div>
                        <h6 className="font-semibold text-lg lg:text-2xl text-blue-950">Email Us</h6>
                        <p className="text-sm lg:text-2xl font-light text-black">abc avenue Abuja, Nigeria</p>
                    </div>
                </div>
            </div>
        </section>
    )
}