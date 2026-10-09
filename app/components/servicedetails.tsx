"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { FiCheck, FiCheckCircle, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { PiDiamond, PiLeaf, PiUser, PiPaintBrush, PiCrown, PiSparkle, PiHeart, PiCamera, PiMagicWand, PiChatCircleDots } from "react-icons/pi";
import { motion } from "framer-motion";

// Map string icon names to actual components
const IconMap: Record<string, React.ElementType> = {
  PiDiamond,
  PiLeaf,
  PiUser,
  PiPaintBrush,
  PiCrown,
  PiSparkle,
  PiHeart,
  PiCamera,
  PiMagicWand,
  PiChatCircleDots,
};

export default function ServiceDetails({ service }: { service: any }) {
  const [currentPage, setCurrentPage] = useState(0);
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

  if (!service) return null;

  const itemsPerPage = 8;
  const totalPages = Math.ceil(service.gallery.images.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const visibleImages = service.gallery.images.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <>
      {/* 2. Service Hero */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-14 xl:px-12 mt-8 sm:mt-10 md:mt-12 lg:mt-14">

<div className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-14">
  {/* Left Text */}
  <motion.div 
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7 }}
    className="flex-1 flex flex-col justify-center py-4 lg:py-6"
  >
    <div className="flex items-center gap-4">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#B80B3E]">
        {service.hero.badge}
      </p>
      <span className="h-[2px] w-12 bg-[#B80B3E]" />
    </div>

    <h2 className="mt-3 font-serif text-4xl font-bold leading-[1.05] text-[#1a0f0b] sm:text-5xl lg:text-6xl">
      <span className="block">{service.hero.titlePrefix}</span>
      <span className="block text-[#B80B3E]">
        {service.hero.titleHighlight}
      </span>
    </h2>

    <p className="mt-5 max-w-[540px] text-[15px] leading-relaxed text-slate-500 sm:text-base">
      {service.hero.description}
    </p>

    {/* Highlights */}
    <div className="mt-8 grid grid-cols-2 gap-x-2 gap-y-8 sm:grid-cols-4 sm:gap-x-0">
      {service.hero.highlights.map((highlight: any, idx: number) => {
        const Icon = IconMap[highlight.icon] || PiDiamond;
        return (
          <div
            key={idx}
            className={`flex flex-col items-center px-2 text-center sm:px-3 ${
              idx > 0 ? "sm:border-l sm:border-[#E9B8C4]" : ""
            }`}
          >
            <div className="mb-3 grid h-[72px] w-[72px] place-items-center rounded-full bg-[#FCE4EA] text-[#B80B3E]">
              <Icon size={34} />
            </div>
            <p className="text-[13px] font-medium leading-snug text-[#1a0f0b] sm:text-sm">
              {highlight.title}
              <br />
              {highlight.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  </motion.div>

  {/* Right Image */}
  <motion.div 
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7 }}
    className="relative w-full flex-1 px-3 py-3 lg:w-1/2"
  >
    {/* pink corner brackets (top-left + bottom-right) */}
    <span className="pointer-events-none absolute left-0 top-0 h-[38%] w-[38%] rounded-tl-2xl border-l-[10px] border-t-[10px] border-[#F9B6C6]" />
    <span className="pointer-events-none absolute bottom-0 right-0 h-[38%] w-[38%] rounded-br-2xl border-b-[10px] border-r-[10px] border-[#F9B6C6]" />

    <div className="relative h-full min-h-[350px] w-full overflow-hidden rounded-2xl shadow-xl">
      <Image
        src={service.hero.image.src}
        alt={service.hero.image.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  </motion.div>
</div>
      </section>

      {/* 3. Service Overview */}

<section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-14 xl:px-12 mt-8">
  <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-14">
    {/* Left Image */}
    <motion.div 
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="relative w-full flex-1 px-3 py-3 lg:w-1/2"
    >
      {/* pink corner brackets (top-left + bottom-right) */}
      <span className="pointer-events-none absolute left-0 top-0 h-[38%] w-[38%] rounded-tl-2xl border-l-[10px] border-t-[10px] border-[#F9B6C6]" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-[38%] w-[38%] rounded-br-2xl border-b-[10px] border-r-[10px] border-[#F9B6C6]" />

      <div className="relative h-full min-h-[350px] w-full overflow-hidden rounded-2xl shadow-xl">
        <Image
          src={service.overview.image.src}
          alt={service.overview.image.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </motion.div>

    {/* Right Text */}
    <motion.div 
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="flex-1 flex flex-col justify-center py-4 lg:py-6"
    >
      <h2 className="font-serif text-4xl font-bold text-[#1a0f0b] sm:text-5xl lg:text-5xl">
        {service.overview.titlePrefix}{" "}
        <span className="text-[#B80B3E]">{service.overview.titleHighlight}</span>
      </h2>
      <span className="mt-4 block h-[2px] w-16 bg-[#B80B3E]" />

      <p className="mt-6 text-[15px] leading-relaxed text-slate-500 sm:text-base">
        {service.overview.description}
      </p>

      {/* Checklist */}
      <ul className="mt-8 space-y-4">
        {service.overview.checklist.map((item: string, idx: number) => (
          <li key={idx} className="flex items-center gap-4">
            <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#B80B3E] text-[14px] text-white">
              <FiCheck strokeWidth={3} />
            </span>
            <span className="text-[15px] text-[#2B2B33]">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  </div>
</section>

      {/* 4. Gallery */}
      <section className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-14 xl:px-12 mt-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <h2 className="font-serif text-3xl text-[#1a0f0b] sm:text-4xl">
              {service.gallery.titlePrefix}
              <span className="text-[#c02a58]">{service.gallery.titleHighlight}</span>
            </h2>
            <span className="hidden h-[2px] w-16 bg-[#e9a5b0] sm:block" />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrev}
              disabled={currentPage === 0}
              className={`grid h-10 w-10 place-items-center rounded-full transition ${currentPage === 0 ? "bg-[#fcedef]/50 text-[#c02a58]/50 cursor-not-allowed" : "cursor-pointer bg-[#fcedef] text-[#c02a58] hover:bg-[#c02a58] hover:text-white"}`}>
              <FiChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className={`grid h-10 w-10 place-items-center rounded-full transition ${currentPage === totalPages - 1 ? "bg-[#fcedef]/50 text-[#c02a58]/50 cursor-not-allowed" : "bg-[#fcedef] cursor-pointer text-[#c02a58] hover:bg-[#c02a58] hover:text-white"}`}>
              <FiChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {visibleImages.map((img: string, idx: number) => {
            const absoluteIndex = currentPage * itemsPerPage + idx;
            return (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={`${currentPage}-${idx}`} 
                className="relative aspect-[4/5] overflow-hidden rounded-2xl group cursor-pointer"
                onClick={() => setLightboxIndex(absoluteIndex)}
              >
                <Image
                  src={img}
                  alt={`Gallery ${absoluteIndex + 1}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-75"
                />
              </motion.div>
            );
          })}
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
              setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : service.gallery.images.length - 1));
            }}
            className="absolute left-4 top-1/2 z-[110] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/30 sm:left-8"
          >
            <FiChevronLeft size={28} />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev! < service.gallery.images.length - 1 ? prev! + 1 : 0));
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
              src={service.gallery.images[lightboxIndex]}
              alt={`Gallery image ${lightboxIndex + 1}`}
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
