import Image from "next/image";

export default function MarketSection() {
    return (
        <section id="markets" className="relative h-[40dvh] xl:h-[80dvh] bg-white">
            <Image 
                src="/images/market-poster.png"
                alt="map view of market areas"
                fill
                className="object-contain"
            />
            <div>
                <div className="absolute top-10 lg:top-20 left-10 lg:left-20">
                    <span className="slate text-black text-md lg:text-xl text-center">
                        [Our Markets]
                    </span>
                    <h2 className="hidden xl:block text-black text-4xl xl:text-6xl font-light text-left">
                        Regions We Operate
                    </h2>
                </div>
                <p className="hidden xl:block mx-10 lg:mx-0 max-w-xl absolute bottom-10 lg:bottom-20 right-0 lg:right-20 text-2xl font-light text-black">
                    At Zayars Energy, we operate across key regions and industries, ensuring our clients have access to reliable and compliant energy trade opportunities worldwide.
                </p>
            </div>
        </section>
    )
}