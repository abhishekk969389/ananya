"use client";

import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { site } from "@/data/index";

export default function SubBanner({ pageName = "about" }: { pageName?: keyof typeof site.subbanner }) {
  const subBannerData = site.subbanner[pageName] || site.subbanner.about;

  if (!subBannerData) return null;

  return (
    <section id={subBannerData.id} className="relative flex min-h-[380px] items-center overflow-hidden bg-[#1a0f0b] lg:min-h-[400px]">
      {/* Background image */}
      <Image
        src={subBannerData.image.src}
        alt={subBannerData.image.alt}
        fill
        priority
        className="object-cover object-[70%_center] lg:object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-14 xl:px-12 mt-10 lg:mt-16"
      >
        <h1 className="font-serif text-5xl text-white md:text-6xl lg:text-[70px]">
          {subBannerData.title}
        </h1>

        <div className="mt-6 flex items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-white sm:text-sm">
          {subBannerData.breadcrumbs.map((crumb, index) => {
            const isLast = index === subBannerData.breadcrumbs.length - 1;
            return (
              <div key={crumb.label} className="flex items-center gap-2">
                <Link
                  href={crumb.href}
                  className={`transition-colors hover:text-[#f4a08f] ${isLast ? "text-[#e0584f]" : "text-white"}`}
                >
                  {crumb.label}
                </Link>
                {!isLast && <FiChevronRight size={14} className="text-white" />}
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
