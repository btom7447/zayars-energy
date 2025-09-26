import Image from "next/image";
import PartnerForm from "./PartnerForm";

export default function PartnersSection() {
    return (
        <section id="partners" className="grid grid-cols-1 lg:grid-cols-3">
            <div className="relative bg-amber-100 p-10">
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
                    className="text-black text-3xl xl:text-6xl font-light text-left mb-5 lg:mb-10"
                    data-aos="fade-right"
                    data-aos-delay="100"
                >
                    Lets Build Together
                </h2>
                <p>
                    From local innovators to international leaders, Zayars Energy partners with organizations everywhere to co-create impactful energy solutions. 
                </p>
            </div>
            <div className="lg:col-span-2 p-10">
                <PartnerForm />
            </div>
        </section>
    )
}