"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaAward,
  FaRegCalendarCheck,
  FaRegSmileBeam,
  FaUsers,
} from "react-icons/fa";
import { GiLipstick } from "react-icons/gi";
import Counter from "../Counter";

import { site } from "@/data/index";

const IconMap: Record<string, React.ElementType> = {
  FaRegSmileBeam,
  FaRegCalendarCheck,
  FaUsers,
  FaAward,
  GiLipstick,
};

export default function MakeupStats() {
  const { image, stats } = site.makeupStats;
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#2A0F1F] mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      {/* Full-width background image */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />

      {/* Dark plum overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#2A0F1F]/85 via-[#3A1628]/75 to-[#2A0F1F]/85" />

      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-2 xl:px-12">
        <div className="grid grid-cols-1 gap-y-8 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0 lg:py-16">
          {stats.map(({ value, label, icon }, i) => {
            const Icon = IconMap[icon] || FaUsers;
            return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              key={label}
              className="group relative flex items-center justify-center gap-4 lg:px-3"
            >
              {/* vertical divider (desktop only) */}
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-white/40 lg:block"
                />
              )}

              <Icon className="shrink-0 text-[44px] text-[#E3B866] transition-transform duration-300 group-hover:scale-110 sm:text-[52px] lg:text-[56px]" />

              <div>
                <p className="text-4xl font-bold leading-none text-white sm:text-[40px]">
                  <Counter value={value} />
                </p>
                <p className="mt-2 text-sm leading-tight text-white/90 sm:text-[15px]">
                  {label}
                </p>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}