"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Twitter, Facebook, Instagram, 
  HouseIcon, InfoIcon, ChartNoAxesColumn, ZapIcon, ShieldCheck, SplitIcon, UsersIcon, 
  HandshakeIcon
} from "lucide-react";

const menuItems = [
  { name: "Home", href: "#home", icon: HouseIcon },
  { name: "Markets", href: "#markets", icon: ChartNoAxesColumn },
  { name: "About Us", href: "#about-us", icon: InfoIcon },
  { name: "Why Us", href: "#why-us", icon: ShieldCheck },
  { name: "Services", href: "#services", icon: ZapIcon },
  { name: "Partners", href: "#partners", icon: HandshakeIcon },
  { name: "Process", href: "#process", icon: SplitIcon },
  { name: "Team", href: "#team", icon: UsersIcon },

];

const socialHandles = [
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "Facebook", href: "https://facebook.com", icon: Facebook },
  { name: "Instagram", href: "https://instagram.com", icon: Instagram },
];

export default function NavMenu({ isOpen, setIsOpen }) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      menuItems.forEach(({ href }) => {
        const section = document.querySelector(href);
        if (!section) return;
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const scrollY = window.scrollY + window.innerHeight / 3; // tweak trigger point
        if (scrollY >= top && scrollY < top + height) {
          current = href;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full right-5 mt-1 max-w-[200px] min-w-sm bg-blue-950 shadow-lg rounded-lg p-5"
        >
          {/* Menu Section */}
          <div className="mb-6">
            <h6 className="slate text-white text-2xl mb-5">Menu</h6>
            <ul className="grid grid-cols-2 gap-5">
              {menuItems.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    className={`flex items-center gap-2 text-lg transition-colors
                      ${activeSection === href ? "text-yellow-300 font-semibold" : "text-white hover:text-yellow-300"}`}
                  >
                    <Icon size={20} strokeWidth={1} />
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Handles Section */}
          <div>
            <h6 className="slate text-white text-2xl mb-5">Social Handles</h6>
            <ul className="flex gap-4">
              {socialHandles.map(({ name, href, icon: Icon }) => (
                <li key={name} className="p-2 border border-white hover:border-yellow-500 rounded-full">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-yellow-300 transition-colors"
                    aria-label={name}
                  >
                    <Icon size={18} strokeWidth={1} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
