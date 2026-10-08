"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { site } from "@/data/index";
import type { AnanyaBannerData } from "@/data/index";

const bannerData: AnanyaBannerData = site.banner;

export default function Banner() {
    if (!bannerData) return null;

    return (
        <section
            id={bannerData.id}
            className="relative flex min-h-[640px] items-center overflow-hidden bg-[#1a0f0b] lg:min-h-[100svh]"
        >
            {/* Background image */}
            <Image
                src={bannerData.image.src}
                alt={bannerData.image.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover object-[70%_center] lg:object-center"
            />

            {/* Dark overlay: stronger on the left so the text stays readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#140a07]/95 via-[#140a07]/65 to-transparent lg:via-[#140a07]/40" />
            <div className="absolute inset-0 bg-black/30 lg:hidden" />

            <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 pb-16 pt-30 md:pt-38 lg:pt-38 xl:pt-40 sm:px-6 lg:px-14  xl:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="max-w-[560px]"
                >
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-[#f4a08f] sm:text-sm">
                        {bannerData.eyebrow}
                    </p>

                    <h1 className="font-serif text-4xl sm:text-5xl md:text-[50px] text-white">
                        {bannerData.titleLine1}
                        <br />
                        {bannerData.titleLine2}
                        <span className="mt-1 block bg-gradient-to-r from-[#f9c4b6] to-[#ee8f80] bg-clip-text pb-4 pr-4 font-script text-6xl italic text-transparent md:text-[60px]">
                            {bannerData.scriptWord}
                        </span>
                    </h1>

                    <p className="mt- max-w-[430px] leading-relaxed text-white/90 text-sm sm:text-sm md:text-base">
                        {bannerData.description}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-4">
                        <Link
                            href={bannerData.primaryCta.href}
                            className="inline-flex items-center gap-3 rounded-full bg-[#f4a597] px-8 py-4 text-[15px] font-semibold text-[#2a1410] transition hover:bg-[#f8b8ac]"
                        >
                            {bannerData.primaryCta.label}
                            <FiArrowRight size={18} />
                        </Link>
                        <Link
                            href={bannerData.secondaryCta.href}
                            className="inline-flex items-center rounded-full border border-[#f4a597]/70 px-8 py-4 text-[15px] font-medium text-white transition hover:bg-white/10"
                        >
                            {bannerData.secondaryCta.label}
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}