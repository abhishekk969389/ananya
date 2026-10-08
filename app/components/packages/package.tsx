"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaFemale, FaGem, FaLeaf } from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";

import { site } from "@/data/index";

const IconMap: Record<string, React.ElementType> = {
  FaGem,
  FaLeaf,
  FaFemale,
  MdOutlineVerifiedUser,
};

export default function MakeupPackages() {
  const { eyebrow, title, titleHighlight, description, highlights, image } = site.makeupPackages;
  return (
    <section className="w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-14 xl:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          {/* Left: content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#B80B3E]">
                {eyebrow}
              </p>
              <span className="h-[2px] w-12 bg-[#B80B3E]" />
            </div>

            <h2 className="mt-1 font-serif text-3xl font-bold sm:text-4xl lg:text-6xl  text-[#14172B]">
              {title}<span className="text-[#B80B3E]">{titleHighlight}</span>
            </h2>

            <p className="mt-2 max-w-[600px] text-xs sm:text-sm md:text-base lg:text-[18px] text-slate-500">
              {description}
            </p>

            {/* Highlights */}
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-0">
              {highlights.map(({ label, icon }, i) => {
                const Icon = IconMap[icon] || FaGem;
                return (
                <div
                  key={label}
                  className={`flex flex-col items-center px-2 text-center sm:px-3 ${
                    i > 0 ? "sm:border-l sm:border-[#E9B8C4]" : ""
                  }`}
                >
                  <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#FCE4EA] text-[30px] text-[#B80B3E]">
                    <Icon />
                  </span>
                  <p className="mt-3 max-w-[140px] text-sm font-medium leading-snug text-[#14172B] sm:text-[15px]">
                    {label}
                  </p>
                </div>
              )})}
            </div>
          </motion.div>

          {/* Right: framed image */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-[640px] px-3 py-3 lg:mx-0"
          >
            {/* pink corner brackets */}
            <span className="absolute left-0 top-0 h-[40%] w-[40%] rounded-tl-xl border-l-[10px] border-t-[10px] border-[#F9B6C6]" />
            <span className="absolute bottom-0 right-0 h-[40%] w-[40%] rounded-br-xl border-b-[10px] border-r-[10px] border-[#F9B6C6]" />

            <div className="relative h-[340px] overflow-hidden rounded-2xl ring-4 ring-white shadow-xl sm:h-[420px] lg:h-[460px]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}