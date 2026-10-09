"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { site } from "@/data/index";
import type { AnanyaPortfolioData } from "@/data/index";

const portfolioData: AnanyaPortfolioData = site.portfolio;

function Tile({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="group relative aspect-[11/10] cursor-pointer overflow-hidden rounded-xl shadow-sm"
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    </motion.div>
  );
}

export default function Portfolio({ hideButton = false }: { hideButton?: boolean } = {}) {
  const [active, setActive] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxIndex]);

  if (!portfolioData) return null;

  const items = active === "All" ? portfolioData.works : portfolioData.works.filter((w) => w.category === active);
  const rowOne = items.slice(0, 5);
  const rowTwo = items.slice(5);

  return (
    <>
      <section
        id={portfolioData.id}
        className="relative z-0 mt-8 overflow-hidden sm:mt-10 md:mt-12 lg:mt-14"
      >
      {/* Decorative Leaf (Right Only) */}
      <div className="pointer-events-none absolute right-0 top-12 z-0 h-24 w-24 -scale-x-100 opacity-50 sm:top-16 sm:h-32 sm:w-32 lg:top-20 lg:h-40 lg:w-40">
        <Image
          src="/emoji.png"
          alt=""
          fill
          className="object-contain object-right-top"
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
              {portfolioData.badge}
            </p>
            <span className="h-[2px] w-10 bg-[#e9a5b0]" />
          </div>

          <h2 className="mt-1 font-serif text-3xl font-bold text-[#1d1a1b] sm:text-4xl lg:text-5xl">
            {portfolioData.titlePrefix} <span className="text-[#c02a58]">{portfolioData.titleHighlight}</span>
          </h2>

          <p className="mx-auto mt-2 max-w-[640px] text-xs text-slate-500 sm:text-sm md:text-base">
            {portfolioData.description}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {portfolioData.categories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={isActive}
                className={`rounded-full border px-5 py-1.5 text-xs font-medium transition sm:text-sm ${
                  isActive
                    ? "border-[#c02a58] bg-[#c02a58] text-white"
                    : "border-[#e9a5b0] text-[#c02a58] hover:bg-[#fde3e6]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Gallery */}
        <div className="mt-8 space-y-3 sm:space-y-4">
          {rowOne.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
              {rowOne.map((w, i) => (
                <Tile key={w.id} src={w.image} alt={w.alt} onClick={() => setLightboxIndex(i)} />
              ))}
            </div>
          )}

          {rowTwo.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
              {rowTwo.map((w, i) => (
                <Tile key={w.id} src={w.image} alt={w.alt} onClick={() => setLightboxIndex(i + 5)} />
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        {!hideButton && (
          <div className="mt-10 flex justify-center">
            <Link
              href={portfolioData.cta.href}
              className="inline-flex items-center gap-4 rounded-full bg-[#c02a58] py-2 pl-7 pr-2 text-sm font-semibold text-white transition hover:bg-[#a82049]"
            >
              {portfolioData.cta.label}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#c02a58]">
                <FiArrowRight size={20} />
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>

    {/* Lightbox Modal */}
    {lightboxIndex !== null && typeof document !== "undefined" && createPortal(
      <div 
        className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 p-4"
        onClick={() => setLightboxIndex(null)}
      >
        {/* Close button */}
        <button
          onClick={() => setLightboxIndex(null)}
          className="absolute right-4 top-4 z-[110] grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/30 sm:right-8 sm:top-8"
        >
          <FiX size={24} />
        </button>

        {/* Prev button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : items.length - 1));
          }}
          className="absolute left-4 top-1/2 z-[110] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/30 sm:left-8"
        >
          <FiChevronLeft size={28} />
        </button>

        {/* Next button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLightboxIndex((prev) => (prev! < items.length - 1 ? prev! + 1 : 0));
          }}
          className="absolute right-4 top-1/2 z-[110] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/30 sm:right-8"
        >
          <FiChevronRight size={28} />
        </button>

        {/* Image Container */}
        <div
          className="relative h-[85vh] w-full max-w-[1200px]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={items[lightboxIndex].image}
            alt={items[lightboxIndex].alt}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
      </div>,
      document.body
    )}
    </>
  );
}