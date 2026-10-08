"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { site } from "@/data/index";
import type { AnanyaBrandsData } from "@/data/index";

const brandsData: AnanyaBrandsData = site.brands;

// Marks map removed, using pure images from JSON

function usePerView() {
  const [perView, setPerView] = useState(7);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 2 : w < 768 ? 3 : w < 1024 ? 4 : w < 1280 ? 5 : 7);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return perView;
}

export default function Brands() {
  const perView = usePerView();
  const [page, setPage] = useState(0);

  if (!brandsData) return null;

  const total = brandsData.brands.length;
  const pages = Math.ceil(total / perView);
  const current = Math.min(page, pages - 1);

  const next = () => setPage((p) => (Math.min(p, pages - 1) + 1) % pages);
  const prev = () => setPage((p) => (Math.min(p, pages - 1) - 1 + pages) % pages);

  // Last page never leaves empty space
  const offsetItems = Math.min(current * perView, total - perView);
  const translate = offsetItems * (100 / perView);

  return (
    <section
      id={brandsData.id}
      className="relative mt-8 sm:mt-10 md:mt-12 lg:mt-14"
    >


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
              {brandsData.badge}
            </p>
            <span className="h-[2px] w-10 bg-[#e9a5b0]" />
          </div>

          <h2 className="mt-1 font-serif text-3xl font-bold text-[#1d1a1b] sm:text-4xl lg:text-5xl">
            {brandsData.titlePrefix} <span className="text-[#c02a58]">{brandsData.titleHighlight}</span>
          </h2>

          <p className="mx-auto mt-2 max-w-[640px] text-xs text-slate-500 sm:text-sm md:text-base">
            {brandsData.description}
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mt-6 px-0 sm:px-14"
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory max-sm:!transform-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              style={{ transform: `translateX(-${translate}%)` }}
            >
              {brandsData.brands.map((b) => (
                <div
                  key={b.id}
                  className="shrink-0 px-1.5 max-sm:snap-center"
                  style={{ width: `${100 / perView}%` }}
                >
                  <div className="grid h-24 place-items-center rounded-xl border border-rose-200/80 bg-white px-2 text-[#1d1a1b] shadow-[0_4px_20px_rgba(192,42,88,0.04)] sm:h-28">
                    {b.logo && (
                      <Image
                        src={b.logo}
                        alt={b.name}
                        width={240}
                        height={120}
                        className="h-auto max-h-24 w-auto max-w-[95%] object-contain mix-blend-multiply"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous brands"
            className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#fde3e6] text-[#c02a58] shadow-md transition hover:bg-[#c02a58] hover:text-white sm:grid sm:h-12 sm:w-12"
          >
            <FiChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next brands"
            className="absolute right-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#fde3e6] text-[#c02a58] shadow-md transition hover:bg-[#c02a58] hover:text-white sm:grid sm:h-12 sm:w-12"
          >
            <FiChevronRight size={22} />
          </button>
        </motion.div>

        {/* Dots */}
        <div className="mt-4 hidden justify-center gap-3 sm:flex">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`Go to page ${i + 1}`}
              aria-current={i === current}
              className={`h-3 w-3 rounded-full transition ${
                i === current ? "bg-[#c02a58]" : "bg-[#f3c3cb] hover:bg-[#e9a5b0]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}