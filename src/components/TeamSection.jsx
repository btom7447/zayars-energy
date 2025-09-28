"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

export default function TeamSection() {
  const [team, setTeam] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [activeMember, setActiveMember] = useState(null);

  // Fetch team members
  const fetchTeam = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/team");
      const data = await res.json();

      // Only visible members
      const visibleTeam = data.filter(member => member.visible);
      setTeam(visibleTeam);
    } catch (err) {
      console.error("❌ Failed to fetch team:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchTeam();

    if (typeof window !== "undefined" && !window.AOS) {
      AOS.init({
        duration: 800,
        easing: "ease-out",
        once: true,
        offset: 100,
      });
    }
  }, []);

  const handleMemberClick = (index) => {
    if (activeMember === index) {
      // If clicking the same member, close it
      setActiveMember(null);
    } else {
      // Open new member
      setActiveMember(index);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center py-20">
        <MoonLoader size={40} color="#1d4ed8" />
      </div>
    );
  }

  if (!team.length) {
    return <p className="text-center text-xl py-15 text-gray-600">No team members available</p>;
  }

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
            perPage: 4,
            breakpoints: {
              1280: { perPage: 3 },
              1024: { perPage: 2 },
              640: { perPage: 1 },
            },
          }}
        >
          {team.map((member, index) => (
            <SplideSlide key={index}>
              <div 
                className="relative p-5 rounded-2xl border border-gray-300 bg-gray-200 overflow-hidden h-70 lg:h-100 cursor-pointer transition-all duration-500 ease-in-out"
                onClick={() => handleMemberClick(index)}
              >
                {/* Front Content - Image & Basic Info */}
                <div className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                  activeMember === index ? '-translate-y-full' : 'translate-y-0'
                }`}>
                  {/* Image with fill */}
                  <Image
                    src={member.photoUrl || "/images/team/default.png"}
                    alt={member.fullName}
                    fill
                    className="object-cover object-top rounded-2xl"
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
                      {member.fullName}
                    </h5>
                    <p
                      className="text-gray-600 font-light text-sm lg:text-xl leading-relaxed"
                      data-aos="fade-up"
                      data-aos-delay="400"
                    >
                      {member.title}
                    </p>
                  </div>
                </div>

                {/* Back Content - Bio & Socials */}
                <div className={`absolute inset-0 p-5 transition-transform duration-500 ease-in-out ${
                  activeMember === index ? 'translate-y-0' : 'translate-y-full'
                }`}>
                  <div className="h-full flex flex-col justify-between">
                    {/* Bio */}
                    <div className="flex-1 overflow-y-auto">
                      <h5 className="text-primary text-xl lg:text-2xl font-semibold text-blue-950 mb-3">
                        {member.fullName}
                      </h5>
                      <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                        {member.bio || "No bio available for this team member."}
                      </p>
                    </div>

                    {/* Social Links */}
                    {(member.linkedin || member.twitter) && (
                      <div className="flex gap-4 mt-4 pt-4 border-t border-gray-300">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-gray-300 rounded-full p-4 w-fit"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Image
                              src={"/images/icons/linkedin-icon.png"}
                              alt={member.name}
                              width={10}
                              height={10}
                              className="w-7 h-7 object-contain"
                            />
                          </a>
                        )}
                        {member.twitter && (
                          <a
                            href={member.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-gray-300 rounded-full p-4 w-fit"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Image
                              src={"/images/icons/instagram-icon.png"}
                              alt={member.name}
                              width={10}
                              height={10}
                              className="w-7 h-7 object-contain"
                            />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
}