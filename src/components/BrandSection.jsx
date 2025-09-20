"use client";

import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

const brandSlides = [
  { name: "wellahealth", image: "/images/brands/brand-one.png" },
  { name: "aldar", image: "/images/brands/brand-two.png" },
  { name: "wephco", image: "/images/brands/brand-three.png" },
  { name: "AA Rano", image: "/images/brands/brand-four.png" },
  { name: "DAMAC", image: "/images/brands/brand-five.png" },
  { name: "Aramaco", image: "/images/brands/brand-six.webp" },
];

export default function BrandSection() {
  return (
    <section id="partners" className="px-10 lg:px-20 xl:px-30 py-10 bg-gray-50 border-t border-gray-300">
        <Splide
          options={{
            type: "loop",
            perPage: 6,
            autoplay: true,
            interval: 3000,
            arrows: false,
            pagination: false,
            breakpoints: {
              1024: { perPage: 6 },
              768: { perPage: 4 },
              480: { perPage: 2 },
            },
          }}
          aria-label="Our clients"
          className="flex items-center"
        >
          {brandSlides.map((brand, index) => (
            <SplideSlide key={index}>
              <div className="relative w-[150px] h-[60px] overflow-hidden group flex justify-center items-center">
                {/* Grayscale Image */}
                <Image
                  src={brand.image}
                  alt={`${brand.name} logo`}
                  fill
                  loading="lazy"
                  sizes="150px"
                  className="object-contain transform transition-transform grayscale duration-300 translate-y-0 group-hover:translate-y-[100%]"
                />
                {/* Colored Image */}
                <Image
                  src={brand.image}
                  alt={`${brand.name} logo colored`}
                  fill
                  loading="lazy"
                  sizes="150px"
                  className="object-contain transform transition-transform duration-500 -translate-y-[100%] group-hover:translate-y-0"
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
    </section>
  );
}
