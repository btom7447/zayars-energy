import Image from "next/image";
import PartnerForm from "./PartnerForm";

export default function PartnersSection() {
    return (
        <section id="partners" className="grid grid-cols-1 xl:grid-cols-3">
            <div className="relative bg-amber-50 p-10 flex flex-col justify-center">
                <Image
                    src={"/images/backdrop.png"}
                    alt="zayars energy logo"
                    fill
                    className="object-cover"
                />
                <span className="slate text-black text-md lg:text-xl text-left">
                    [Partner with Us]
                </span>
                <h2 
                    className="text-black text-3xl xl:text-7xl font-light text-left mb-5 lg:mb-10"
                    data-aos="fade-right"
                    data-aos-delay="100"
                >
                    Lets Build Together
                </h2>
                <p 
                    className="text-black text-md lg:text-xl"
                    data-aos="fade-right"
                    data-aos-delay="200"
                >
                    From local innovators to international leaders, Zayars Energy partners with organizations everywhere to co-create impactful energy solutions. 
                </p>
                <ul 
                    className="flex items-center gap-5 list-none mt-5"
                    data-aos="fade-up"
                    data-aos-delay="300"
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
            <div className="lg:col-span-2 p-10 py-15">
                <PartnerForm />
            </div>
        </section>
    )
}