import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="w-full bg-blue-950 px-10 pt-10 lg:px-20 lg:pt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 items-start">
                {/* Company Section */}
                <div className="xl:col-span-1">
                    <h6 className="text-2xl font-semibold text-yellow-500 mb-5">Company</h6>
                    <ul className="space-y-5">
                        <li className="text-white font-light text-lg lg:text-2xl hover:text-yellow-400">
                            <Link href="#about-us">About Us</Link>
                        </li>
                        <li className="text-white font-light text-lg lg:text-2xl hover:text-yellow-400">
                            <Link href="#mission-vision">Mission & Vision</Link>
                        </li>
                        <li className="text-white font-light text-lg lg:text-2xl hover:text-yellow-400">
                            <Link href="#services">Services</Link>
                        </li>
                        <li className="text-white font-light text-lg lg:text-2xl hover:text-yellow-400">
                            <Link href="#partnership">Partnership</Link>
                        </li>
                        <li className="text-white font-light text-lg lg:text-2xl hover:text-yellow-400">
                            <Link href="#make-deal">Make a Deal</Link>
                        </li>
                    </ul>
                </div>
                
                {/* Resources Section */}
                <div className="xl:col-span-1">
                    <h6 className="text-2xl font-semibold text-yellow-500 mb-5">Resources</h6>
                    <ul className="space-y-5">
                        <li className="text-white font-light text-lg lg:text-2xl hover:text-yellow-400">
                            <Link href="#mission-vision">Insight/Blog</Link>
                        </li>
                        <li className="text-white font-light text-lg lg:text-2xl hover:text-yellow-400">
                            <Link href="#services">Reports & Case Studies</Link>
                        </li>
                        <li className="text-white font-light text-lg lg:text-2xl hover:text-yellow-400">
                            <Link href="#partnership">FAQs</Link>
                        </li>
                        <li className="text-white font-light text-lg lg:text-2xl hover:text-yellow-400">
                            <Link href="#make-deal">News & Media</Link>
                        </li>
                    </ul>
                </div>
                
                {/* Legal Section */}
                <div className="xl:col-span-1">
                    <h6 className="text-2xl font-semibold text-yellow-500 mb-5">Legal</h6>
                    <ul className="space-y-5">
                        <li className="text-white font-light text-lg lg:text-2xl hover:text-yellow-400">
                            <Link href="#about-us">Terms of use</Link>
                        </li>
                        <li className="text-white font-light text-lg lg:text-2xl hover:text-yellow-400">
                            <Link href="#mission-vision">Privacy policy</Link>
                        </li>
                        <li className="text-white font-light text-lg lg:text-2xl hover:text-yellow-400">
                            <Link href="#services">Disclaimer</Link>
                        </li>
                        <li className="text-white font-light text-lg lg:text-2xl hover:text-yellow-400">
                            <Link href="#partnership">Cookie policy</Link>
                        </li>
                        <li className="text-white font-light text-lg lg:text-2xl hover:text-yellow-400">
                            <Link href="#make-deal">Regulatory compliance</Link>
                        </li>
                    </ul>
                </div>
                
                {/* Newsletter Section - spans 2 columns on xl screens */}
                <div className="md:col-span-2 lg:col-span-2 xl:col-span-2">
                    <h6 className="text-2xl font-semibold text-yellow-500 mb-5">Keep me Updated</h6>
                    <div className="flex items-center justify-between rounded-full border border-gray-300 bg-white p-1">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="text-black text-lg md:text-xl xl:text-2xl font-light p-3 md:p-5 w-full focus:outline-none bg-transparent"
                        />
                        <button className="p-3 md:p-5 bg-yellow-500 text-blue-950 hover:bg-blue-950 hover:text-yellow-500 rounded-full cursor-pointer transition-colors duration-300 flex-shrink-0">
                            <ArrowUpRight size={25} strokeWidth={1} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-20 w-full flex flex-col xl:flex-row items-center justify-center xl:justify-between">
                <p className="text-white text-sm lg:text-2xl font-light">&copy; {currentYear} Zayars Energy. All rights reserved.</p>
                <a
                    href="https://kmini-tech.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-500 text-sm lg:text-2xl font-light"
                >
                    By Kmini Technologies
                </a>
                
            </div>
            <div className="w-full pt-20 relative overflow-hidden ">
                <Image 
                    src="/images/footer-poster.png"
                    alt="footer poster"
                    width={500}
                    height={30}
                    className="h-30 w-full object-contain"
                />
            </div>
        </footer>
    )
}