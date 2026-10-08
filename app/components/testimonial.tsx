"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { site } from "@/data/index";
import type { AnanyaTestimonialData } from "@/data/index";

const testimonialData: AnanyaTestimonialData = site.testimonial;

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const total = testimonialData?.testimonials.length || 0;

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  // Auto-slide
  useEffect(() => {
    if (!testimonialData) return;
    const id = setTimeout(next, testimonialData.autoSlideMs);
    return () => clearTimeout(id);
  }, [index, next]);

  if (!testimonialData) return null;

  return (
    <section
      id={testimonialData.id}
      className="relative mt-8 sm:mt-10 md:mt-12 lg:mt-14"
    >
      <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-14 xl:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          {/* Left: image collage */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto aspect-[5/5.4] w-full max-w-[620px]"
          >
            <div className="absolute left-0 top-0 h-[86%] w-[52%] rounded-sm bg-[#eba6b3]" />
            <div className="absolute right-[3%] top-[8%] h-[88%] w-[26%] rounded-sm bg-[#efafba]" />
            <div className="absolute bottom-0 left-[38%] h-[8%] w-[50%] rounded-sm bg-[#eba6b3]" />

            <div className="absolute left-[5%] top-[2%] h-[94%] w-[80%] rounded-2xl border border-[#d6336c]/70 bg-white p-[2.5%] shadow-lg">
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src={testimonialData.leftImage.src}
                  alt={testimonialData.leftImage.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 520px, 90vw"
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: content */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="min-w-0"
          >
            <div className="mx-auto max-w-[760px] text-center">
              <div className="flex items-center justify-center gap-4">
                <span className="h-[2px] w-10 bg-[#e9a5b0]" />
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c02a58]">
                  {testimonialData.badge}
                </p>
                <span className="h-[2px] w-10 bg-[#e9a5b0]" />
              </div>

              <h2 className="mt-1 font-serif text-3xl font-bold text-[#1d1a1b] sm:text-4xl lg:text-5xl">
                {testimonialData.titlePrefix} <span className="text-[#c02a58]">{testimonialData.titleHighlight}</span>
              </h2>

              <p className="mx-auto mt-2 max-w-[640px] text-xs text-slate-500 sm:text-sm md:text-base">
                {testimonialData.description}
              </p>
            </div>

            {/* Slider */}
            <div className="relative mt-8">
              <div className="overflow-hidden rounded-2xl bg-white/80 shadow-[0_8px_30px_rgba(192,42,88,0.06)]">
                <div
                  className="flex transition-transform duration-500 ease-in-out max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory max-sm:!transform-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  style={{ transform: `translateX(-${index * 100}%)` }}
                >
                  {testimonialData.testimonials.map((t) => (
                    <div
                      key={t.id}
                      className="relative w-full shrink-0 px-8 py-8 sm:px-12 sm:py-9 max-sm:snap-center"
                    >
                      <FaQuoteLeft className="text-3xl text-[#c02a58]" />

                      <p className="mt-4 max-w-[480px] text-sm leading-relaxed text-[#2b2627] sm:text-base">
                        {t.text}
                      </p>

                      <span className="mt-4 block h-[2px] w-20 bg-[#e9a5b0]" />

                      <div className="mt-4 flex items-center gap-4">
                        <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-[3px] border-[#f2b8c2]">
                          <Image
                            src={t.avatar}
                            alt={t.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </span>
                        <div>
                          <p className="font-serif text-lg font-bold text-[#1d1a1b]">
                            {t.name}
                          </p>
                          <div className="mt-1 flex gap-1 text-[#f9a61a]">
                            {Array.from({ length: t.rating }).map((_, s) => (
                              <FaStar key={s} size={14} />
                            ))}
                          </div>
                          <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                            {t.role}
                          </p>
                        </div>
                      </div>

                      <FaQuoteRight className="pointer-events-none absolute bottom-6 right-8 text-7xl text-[#f6d9dd] sm:text-8xl" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrows */}
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#fde3e6] text-[#c02a58] shadow-md ring-4 ring-white/70 transition hover:bg-[#c02a58] hover:text-white sm:grid sm:h-12 sm:w-12"
              >
                <FiChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="absolute right-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full bg-[#fde3e6] text-[#c02a58] shadow-md ring-4 ring-white/70 transition hover:bg-[#c02a58] hover:text-white sm:grid sm:h-12 sm:w-12"
              >
                <FiChevronRight size={22} />
              </button>
            </div>

            {/* Dots */}
            <div className="mt-6 hidden justify-center gap-3 sm:flex">
              {testimonialData.testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === index}
                  className={`h-3 w-3 rounded-full transition ${
                    i === index ? "bg-[#c02a58]" : "bg-[#f3c3cb] hover:bg-[#e9a5b0]"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}