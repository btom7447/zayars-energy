"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const teamSlide = [
  {
    name: "John Doe",
    office: "Group Chairman",
    img: "/images/team/help-desk.png",
  },
  {
    name: "John Doe",
    office: "Group Chairman",
    img: "/images/team/public-relations.png",
  },
  {
    name: "John Doe",
    office: "Group Chairman",
    img: "/images/team/logistics.png",
  },
  {
    name: "John Doe",
    office: "Group Chairman",
    img: "/images/team/help-desk.png",
  },
  {
    name: "John Doe",
    office: "Group Chairman",
    img: "/images/team/public-relations.png",
  },
  {
    name: "John Doe",
    office: "Group Chairman",
    img: "/images/team/logistics.png",
  },
  {
    name: "John Doe",
    office: "Group Chairman",
    img: "/images/team/help-desk.png",
  },
];

export default function TeamSection() {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.AOS) {
      AOS.init({
        duration: 800,
        easing: "ease-out",
        once: true,
        offset: 100,
      });
    }
  }, []);

  return (
    <section id="team" className="teamSection py-10 px-5 lg:p-20 bg-gray-100">
      <span className="block mx-auto slate text-black text-md lg:text-xl text-center">
        [Our Team]
      </span>
      <h2
        className="text-black text-3xl xl:text-6xl font-light text-center mb-5 lg:mb-20"
        data-aos="fade-down"
        data-aos-delay="100"
      >
        Experienced Experts
      </h2>

      <div className="w-full">
        <Splide
            options={{
                type: "loop",
                rewind: true,
                autoplay: true,
                interval: 5000,
                arrows: false,
                pagination: true,
                speed: 800,
                gap: "1rem",
                perPage: 4, // ✅ default for desktop
                breakpoints: {
                1280: { perPage: 3 }, // large screens
                1024: { perPage: 2 }, // tablets
                640: { perPage: 1 },  // mobile
                },
            }}
        >
            {teamSlide.map((slide, index) => (
                    <SplideSlide key={index}>
                        <div className="relative p-5 rounded-2xl border border-gray-300 bg-gray-200 overflow-hidden h-70 lg:h-100">
                            {/* Image with fill */}
                            <Image
                                src={slide.img}
                                alt={slide.name}
                                fill
                                className="mt-5 object-cover object-top rounded-2xl"
                            />

                            {/* Bottom gradient overlay */}
                            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-gray-300/80 to-transparent z-10" />
                                {/* Overlay text */}
                                <div
                                    className="absolute bottom-5 left-5 z-20"
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                >
                                    <h5 className="text-primary text-xl lg:text-3xl font-semibold text-blue-950 text-heading">
                                        {slide.name}
                                    </h5>
                                    <p
                                        className="text-gray-600 font-light text-sm lg:text-xl leading-relaxed"
                                        data-aos="fade-up"
                                        data-aos-delay="400"
                                    >
                                        {slide.office}
                                    </p>
                                </div>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </section>
    );
}
