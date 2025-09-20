"use client";

import { useEffect } from "react";
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
  // Init AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section
      id="process"
      className="relative bg-white py-20 px-5 lg:px-20"
    >
      <span className="block mx-auto text-black text-md lg:text-xl text-center">
        [How it Works]
      </span>
      <h2 className="text-black text-3xl xl:text-6xl font-light text-center mb-10">
        The Process
      </h2>

      <div className="relative space-y-20">
        {processFlow.map((step, index) => (
          <div
            key={index}
            className="sticky top-27 lg:top-32 xl:top-40 w-full bg-white p-5 lg:p-10 flex flex-col lg:flex-row gap-5 items-center transition-all duration-500"
            style={{ zIndex: index + 1 }}
            data-aos="fade-up"
          >
            {/* Text Section */}
            <div className="flex-1 pt-20">
              <span className="absolute -top-10 left-5 text-6xl lg:text-9xl xl:text-[100px] font-bold text-gray-200">
                {step.step}
              </span>
              <h3 className="text-black text-xl lg:text-6xl font-semibold mb-4 relative z-10">
                {step.title}
              </h3>
              <p className="text-lg lg:text-2xl font-light text-gray-700 mb-5">
                {step.text}
              </p>
              <ul className="list-none text-gray-700 space-y-2">
                {step.points.map((point, idx) => (
                  <li
                    key={idx}
                    className="text-sm lg:text-lg font-light flex items-center gap-2"
                  >
                    <DotIcon size={24} className="text-black" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image Section */}
            <div className="flex justify-center">
              <Image
                src={step.image}
                alt={step.title}
                width={400}
                height={400}
                className="rounded-full w-40 h-40 lg:w-50 lg:h-50 object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
