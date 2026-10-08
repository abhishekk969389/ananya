"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { PiDiamond, PiPaintBrush, PiStar, PiUsersThree } from "react-icons/pi";
import { motion } from "framer-motion";
import Counter from "./Counter";
import { site } from "@/data/index";
import type { AnanyaAboutSectionData } from "@/data/index";

const aboutData: AnanyaAboutSectionData = site.about;

const iconMap: Record<string, any> = {
  PiDiamond,
  PiUsersThree,
  PiPaintBrush,
  PiStar,
};

export default function About({ hideButton = false }: { hideButton?: boolean } = {}) {
  if (!aboutData) return null;

  return (
    <section
      id={aboutData.id}
      className="mt-8 sm:mt-10 md:mt-12 lg:mt-14"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-14 xl:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: image collage */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto h-[420px] w-full max-w-[600px] sm:h-[520px] lg:h-[580px]"
          >
            {/* Pink block */}
            <div className="absolute left-0 top-[10%] h-[58%] w-[24%] bg-[#e9a5b0]/80" />

            {/* Top outline frame */}
            <div className="absolute left-[8%] top-0 h-[34%] w-[50%] border border-[#d6a98a]" />

            {/* Bottom-right outline frame */}
            <div className="absolute bottom-[3%] right-0 h-[52%] w-[40%] border border-[#d6a98a]" />

            {/* Bottom pink bar */}
            <div className="absolute bottom-0 left-[10%] h-[6%] w-[52%] bg-[#f0b9c0]" />

            {/* Main image */}
            <div className="absolute left-[15%] top-[7%] h-[86%] w-[76%] overflow-hidden shadow-xl">
              <Image
                src={aboutData.mainImage.src}
                alt={aboutData.mainImage.alt}
                fill
                sizes="(min-width: 1024px) 420px, 70vw"
                className="object-cover"
              />
            </div>

            {/* Small brush image */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute bottom-[5%] left-[2%] h-[34%] w-[30%] overflow-hidden border-[6px] border-white shadow-lg"
            >
              <Image
                src={aboutData.secondaryImage.src}
                alt={aboutData.secondaryImage.alt}
                fill
                sizes="200px"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Right: content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d98b94]">
                {aboutData.badge}
              </p>
              <span className="h-[2px] w-10 bg-[#e9a5b0]" />
            </div>

            <h2 className="mt-1 font-serif text-3xl font-bold text-[#1d1a1b] sm:text-4xl lg:text-5xl">
              {aboutData.titlePrefix}{" "}
              <span className="italic text-[#c02a58]">{aboutData.titleHighlight}</span>
            </h2>

            <span className="mt-5 block h-[2px] w-16 bg-[#e9a5b0]" />

            <div className="mt-6 space-y-3 text-xs text-[#2b2627] sm:text-sm md:text-base">
              {aboutData.paragraphs.map((paragraph, idx) => (
                <p key={idx}>
                  {paragraph.map((part, pIdx) =>
                    part.bold ? <strong key={pIdx}>{part.text}</strong> : <React.Fragment key={pIdx}>{part.text}</React.Fragment>
                  )}
                </p>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-y-8 sm:grid-cols-4">
              {aboutData.stats.map((stat, i) => {
                const Icon = iconMap[stat.icon] || PiStar;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    key={stat.id}
                    className={`group flex flex-col items-center px-2 text-center ${
                      i !== 0 ? "sm:border-l sm:border-[#e9b3ba]" : ""
                    }`}
                  >
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-[#fbdfe0] text-[#c02a58] transition-colors duration-300 group-hover:bg-[#c02a58] group-hover:text-white">
                      <Icon size={28} />
                    </span>
                    <p className="mt-3 font-serif text-2xl font-bold text-[#c02a58] sm:text-3xl">
                      <Counter value={stat.value} />
                    </p>
                    <p className="mt-1 text-xs text-[#2b2627] sm:text-sm">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            {!hideButton && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href={aboutData.cta.href}
                  className="mt-8 inline-flex items-center gap-4 rounded-full bg-[#c02a58] py-2 pl-7 pr-2 text-sm font-semibold text-white transition hover:bg-[#a82049]"
                >
                  {aboutData.cta.label}
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#c02a58]">
                    <FiArrowRight size={18} />
                  </span>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}