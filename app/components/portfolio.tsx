"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`;

const categories = ["All", "Bridal", "Party", "Engagement", "Pre-Wedding", "Reception"];

const works = [
  { category: "Bridal", alt: "Bridal look", src: unsplash("photo-1583391733956-3750e0ff4e8b") },
  { category: "Party", alt: "Party look", src: unsplash("photo-1522335789203-aabd1fc54bc9") },
  { category: "Reception", alt: "Reception look", src: unsplash("photo-1487412947147-5cebf100ffc2") },
  { category: "Engagement", alt: "Engagement look", src: unsplash("photo-1512496015851-a90fb38ba796") },
  { category: "Pre-Wedding", alt: "Pre-wedding look", src: unsplash("photo-1494790108377-be9c29b29330") },
  { category: "Bridal", alt: "Bridal hairstyle", src: unsplash("photo-1516975080664-ed2fc6a32937") },
  { category: "Party", alt: "Party glam", src: unsplash("photo-1438761681033-6461ffad8d80") },
  { category: "Engagement", alt: "Makeup application", src: unsplash("photo-1522335789203-aabd1fc54bc9") },
  { category: "Bridal", alt: "Bridal portrait", src: unsplash("photo-1583391733956-3750e0ff4e8b") },
  { category: "Reception", alt: "Reception glam", src: unsplash("photo-1487412947147-5cebf100ffc2") },
  { category: "Pre-Wedding", alt: "Makeup brushes", src: unsplash("photo-1596462502278-27bfdc403348") },
];

function Tile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[11/10] overflow-hidden rounded-xl shadow-sm">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover transition duration-500 hover:scale-105"
      />
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("All");

  const items = active === "All" ? works : works.filter((w) => w.category === active);
  const rowOne = items.slice(0, 5);
  const rowTwo = items.slice(5);

  return (
    <section
      id="portfolio"
      className="relative mt-8 sm:mt-10 md:mt-12 lg:mt-14"
    >
      <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-14 xl:px-12">
        {/* Heading */}
        <div className="mx-auto max-w-[760px] text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-[2px] w-10 bg-[#e9a5b0]" />
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c02a58]">
              Portfolio
            </p>
            <span className="h-[2px] w-10 bg-[#e9a5b0]" />
          </div>

          <h2 className="mt-1 font-serif text-3xl font-bold text-[#1d1a1b] sm:text-4xl lg:text-5xl">
            My Makeup <span className="text-[#c02a58]">Work</span>
          </h2>

          <p className="mx-auto mt-2 max-w-[640px] text-xs text-slate-500 sm:text-sm md:text-base">
            A glimpse of my recent makeup looks — from bridal beauty to party glam. Each
            look is crafted with creativity, precision and a personal touch to bring out
            your natural charm.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => {
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
        </div>

        {/* Gallery */}
        <div className="mt-8 space-y-3 sm:space-y-4">
          {rowOne.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
              {rowOne.map((w, i) => (
                <Tile key={`${w.alt}-${i}`} src={w.src} alt={w.alt} />
              ))}
            </div>
          )}

          {rowTwo.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
              {rowTwo.map((w, i) => (
                <Tile key={`${w.alt}-b-${i}`} src={w.src} alt={w.alt} />
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="#contact"
            className="inline-flex items-center gap-4 rounded-full bg-[#c02a58] py-2 pl-7 pr-2 text-sm font-semibold text-white transition hover:bg-[#a82049]"
          >
            View More Portfolio
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#c02a58]">
              <FiArrowRight size={20} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}