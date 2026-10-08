"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaGem,
  FaPaintBrush,
  FaRegCalendarAlt,
  FaUserFriends,
} from "react-icons/fa";

import { site } from "@/data/index";

const IconMap: Record<string, React.ElementType> = {
  FaPaintBrush,
  FaGem,
  FaUserFriends,
  FaRegCalendarAlt,
};

export default function MakeupWhyChoose() {
  const { eyebrow, title, titleHighlight, description, features, images } = site.whyChooseUs;
  return (
    <section className="w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-14 xl:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8 xl:gap-10">
          {/* Left: overlapping images */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto h-[420px] w-full max-w-[640px] sm:h-[500px] lg:mx-0 lg:h-[560px] lg:max-w-none"
          >
            {/* pale pink blocks behind the small photo */}
            <span className="absolute left-[7%] top-[6%] h-[88%] w-[30%] rounded-md bg-[#FBE9EA]" />
            <span className="absolute left-0 top-[19%] h-[60%] w-1.5 rounded-full bg-[#F4C9CC]" />

            {/* large photo */}
            <div className="absolute right-0 top-0 h-full w-[72%] overflow-hidden rounded-lg shadow-lg">
              <Image
                src={images.large.src}
                alt={images.large.alt}
                fill
                sizes="(min-width: 1024px) 460px, 72vw"
                className="object-cover"
              />
            </div>

            {/* small photo */}
            <div className="absolute left-[3%] top-[17%] z-10 h-[64%] w-[42%] overflow-hidden rounded-lg border-4 border-white shadow-xl">
              <Image
                src={images.small.src}
                alt={images.small.alt}
                fill
                sizes="(min-width: 1024px) 220px, 40vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right: content */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D95F5F]">
                {eyebrow}
              </p>
              <span className="h-[2px] w-12 bg-[#D95F5F]" />
            </div>

            <h2 className="mt-1 font-serif text-3xl font-semibold sm:text-4xl lg:text-5xl text-[#14172B]">
              {title}
              <span className="text-[#D95F5F]">{titleHighlight}</span>
            </h2>

            <p className="mt-2 max-w-[600px] text-xs sm:text-sm md:text-base text-slate-500">
              {description}
            </p>

            {/* Features */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-0">
              {features.map(({ title, text, icon }, i) => {
                const Icon = IconMap[icon] || FaGem;
                return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  key={title}
                  className={`flex items-start gap-4 sm:py-6 ${
                    i % 2 === 0 ? "sm:pr-8" : "sm:border-l sm:border-slate-200 sm:pl-8"
                  } ${i < 2 ? "sm:border-b sm:border-slate-200 sm:pt-0" : "sm:pb-0"}`}
                >
                  <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-[#FCE8E8] text-[26px] text-[#D95F5F]">
                    <Icon />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#14172B] lg:text-xl">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      {text}
                    </p>
                  </div>
                </motion.div>
              )})}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}