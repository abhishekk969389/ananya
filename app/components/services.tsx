"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import {
  PiCamera,
  PiChatCircleDots,
  PiCrown,
  PiHeart,
  PiMagicWand,
  PiSparkle,
} from "react-icons/pi";
import { motion } from "framer-motion";
import { site } from "@/data/index";
import type { AnanyaServicesData } from "@/data/index";

const servicesData: AnanyaServicesData = site.ourServices;

const iconMap: Record<string, any> = {
  PiCrown,
  PiSparkle,
  PiHeart,
  PiCamera,
  PiMagicWand,
  PiChatCircleDots,
};

export default function Services() {
  if (!servicesData) return null;

  return (
    <section
      id={servicesData.id}
      className="relative z-0 mt-8 overflow-hidden sm:mt-10 md:mt-12 lg:mt-14"
    >
      {/* Decorative Leaves */}
      <div className="pointer-events-none absolute left-0 top-0 z-0 h-24 w-24 opacity-50 sm:h-32 sm:w-32 lg:h-40 lg:w-40">
        <Image
          src="/emoji.png"
          alt=""
          fill
          className="object-contain object-left-top"
        />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 z-0 h-24 w-24 -scale-x-100 opacity-50 sm:h-32 sm:w-32 lg:h-40 lg:w-40">
        <Image
          src="/emoji.png"
          alt=""
          fill
          className="object-contain object-left-top"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-14 xl:px-12">
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[760px] text-center"
        >
          <div className="flex items-center justify-center gap-4">
            <span className="h-[2px] w-10 bg-[#e9a5b0]" />
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c02a58]">
              {servicesData.badge}
            </p>
            <span className="h-[2px] w-10 bg-[#e9a5b0]" />
          </div>

          <h2 className="mt-1 font-serif text-3xl font-bold text-[#1d1a1b] sm:text-4xl lg:text-5xl">
            {servicesData.titlePrefix} <span className="text-[#c02a58]">{servicesData.titleHighlight}</span>
          </h2>

          <p className="mx-auto mt-2 max-w-[640px] text-xs text-slate-500 sm:text-sm md:text-base">
            {servicesData.description}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.services.map(({ id, icon, title, description, image, link, linkLabel }, index) => {
            const Icon = iconMap[icon] || PiSparkle;
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={id}
              >
                <Link href={link} className="block">
                  <article className="group flex flex-col gap-4 rounded-2xl bg-white/75 p-3 shadow-[0_8px_30px_rgba(192,42,88,0.06)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_12px_40px_rgba(192,42,88,0.12)] sm:flex-row sm:p-4">
                  <div className="relative h-60 w-full shrink-0 overflow-hidden rounded-xl sm:h-auto sm:min-h-[200px] sm:w-[48%]">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(min-width: 1024px) 170px, (min-width: 640px) 200px, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-center py-1 pr-1">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-[#fde3e6] text-[#c02a58] transition-all duration-300 group-hover:bg-[#c02a58] group-hover:text-white">
                      <Icon size={26} />
                    </span>

                    <h3 className="mt-4 font-serif text-lg font-bold text-[#1d1a1b]">
                      {title}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-[#2b2627] sm:text-sm">
                      {description}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#c02a58] transition group-hover:gap-3">
                      {linkLabel}
                      <FiArrowRight size={16} />
                    </span>
                  </div>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}