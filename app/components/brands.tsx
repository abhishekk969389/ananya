"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

/**
 * Brand logos are trademarked, so they are not on Unsplash.
 * By default each brand is drawn as a text wordmark.
 * To use a real logo, put the file in /public/brands and set `logo`,
 * e.g. { name: "MAC", logo: "/brands/mac.png" }
 */
type Brand = { name: string; logo?: string; mark?: ReactNode };

const brands: Brand[] = [
  { name: "MAC", mark: <span className="text-3xl font-light tracking-[0.18em]">M·A·C</span> },
  {
    name: "Maybelline New York",
    mark: (
      <span className="text-center leading-tight">
        <span className="block text-sm font-medium tracking-[0.28em]">MAYBELLINE</span>
        <span className="block text-right text-[10px] font-semibold tracking-[0.15em]">NEW YORK</span>
      </span>
    ),
  },
  {
    name: "L'Oréal Paris",
    mark: (
      <span className="text-center leading-tight">
        <span className="block font-serif text-2xl font-semibold tracking-wide">L&apos;ORÉAL</span>
        <span className="block text-[10px] tracking-[0.2em]">PARIS</span>
      </span>
    ),
  },
  { name: "Bobbi Brown", mark: <span className="text-xs font-semibold tracking-[0.3em]">BOBBI BROWN</span> },
  {
    name: "Huda Beauty",
    mark: (
      <span className="text-xl font-light tracking-tight">
        HUDA<span className="font-semibold text-[#e9208c]">BEAUTY</span>
      </span>
    ),
  },
  { name: "NARS", mark: <span className="text-4xl font-extralight tracking-tighter">NARS</span> },
  {
    name: "Estée Lauder",
    mark: (
      <span className="text-center leading-tight">
        <span className="mx-auto mb-1 grid h-8 w-8 place-items-center border-2 border-black font-serif text-sm italic">
          EL
        </span>
        <span className="block font-serif text-[11px] tracking-[0.18em]">ESTÉE LAUDER</span>
      </span>
    ),
  },
  { name: "Revlon", mark: <span className="text-2xl font-bold tracking-wide">REVLON</span> },
  { name: "Lakmé", mark: <span className="font-serif text-2xl italic tracking-wide">Lakmé</span> },
  { name: "Clinique", mark: <span className="font-serif text-xl tracking-[0.2em]">CLINIQUE</span> },
  { name: "Dior", mark: <span className="font-serif text-3xl tracking-[0.3em]">DIOR</span> },
  {
    name: "Charlotte Tilbury",
    mark: (
      <span className="text-center font-serif text-sm leading-tight tracking-[0.15em]">
        CHARLOTTE
        <br />
        TILBURY
      </span>
    ),
  },
  {
    name: "Fenty Beauty",
    mark: (
      <span className="text-center text-lg font-semibold leading-tight tracking-[0.2em]">
        FENTY
        <span className="block text-[10px] font-medium tracking-[0.35em]">BEAUTY</span>
      </span>
    ),
  },
  { name: "Urban Decay", mark: <span className="text-sm font-bold tracking-[0.2em]">URBAN DECAY</span> },
  { name: "Kryolan", mark: <span className="text-2xl font-bold tracking-tight">Kryolan</span> },
  { name: "Sugar Cosmetics", mark: <span className="text-xl font-extrabold tracking-wide">SUGAR</span> },
];

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

  const total = brands.length;
  const pages = Math.ceil(total / perView);
  const current = Math.min(page, pages - 1);

  const next = () => setPage((p) => (Math.min(p, pages - 1) + 1) % pages);
  const prev = () => setPage((p) => (Math.min(p, pages - 1) - 1 + pages) % pages);

  // Last page never leaves empty space
  const offsetItems = Math.min(current * perView, total - perView);
  const translate = offsetItems * (100 / perView);

  return (
    <section
      id="brands"
      className="relative mt-8 sm:mt-10 md:mt-12 lg:mt-14"
    >


      <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-14 xl:px-12">
        {/* Heading */}
        <div className="mx-auto max-w-[760px] text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-[2px] w-10 bg-[#e9a5b0]" />
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c02a58]">
              Brands
            </p>
            <span className="h-[2px] w-10 bg-[#e9a5b0]" />
          </div>

          <h2 className="mt-1 font-serif text-3xl font-bold text-[#1d1a1b] sm:text-4xl lg:text-5xl">
            Products <span className="text-[#c02a58]">We Use</span>
          </h2>

          <p className="mx-auto mt-2 max-w-[640px] text-xs text-slate-500 sm:text-sm md:text-base">
            We use top-quality, trusted brands to give you safe, long-lasting and
            flawless results.
          </p>
        </div>

        {/* Slider */}
        <div className="relative mt-6 px-12 sm:px-14">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${translate}%)` }}
            >
              {brands.map((b) => (
                <div
                  key={b.name}
                  className="shrink-0 px-1.5"
                  style={{ width: `${100 / perView}%` }}
                >
                  <div className="grid h-32 place-items-center rounded-xl bg-white px-2 text-[#1d1a1b] shadow-sm sm:h-40">
                    {b.logo ? (
                      <Image
                        src={b.logo}
                        alt={b.name}
                        width={140}
                        height={60}
                        className="h-auto max-h-14 w-auto max-w-[85%] object-contain"
                      />
                    ) : (
                      b.mark
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
            className="absolute left-0 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#fde3e6] text-[#c02a58] shadow-md transition hover:bg-[#c02a58] hover:text-white sm:h-12 sm:w-12"
          >
            <FiChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next brands"
            className="absolute right-0 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#fde3e6] text-[#c02a58] shadow-md transition hover:bg-[#c02a58] hover:text-white sm:h-12 sm:w-12"
          >
            <FiChevronRight size={22} />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-3">
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