"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiMenu, FiX } from "react-icons/fi";

const links = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-14 xl:px-12">
        <nav className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link href="#home" className="shrink-0" onClick={() => setActive("Home")}>
            <Image
              src="/logo.png"
              alt="Ananya Makeup Artist"
              width={280}
              height={100}
              priority
              className="h-14 w-auto sm:h-16 lg:h-20"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
            {links.map((link) => {
              const isActive = active === link.label;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setActive(link.label)}
                    className={`relative block py-2 text-[15px] font-medium transition-colors hover:text-[#f4a08f] ${
                      isActive ? "text-[#e0584f]" : "text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute inset-x-0 -bottom-0.5 h-[3px] rounded-full bg-[#d9423f]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="#contact"
            className="hidden items-center gap-4 rounded-full bg-gradient-to-r from-[#fbd3c9] to-[#f2a799] py-2 pl-6 pr-3 text-sm font-semibold text-[#5a1f26] shadow-[0_0_25px_rgba(242,167,153,0.35)] transition hover:brightness-105 lg:flex"
          >
            Book a Makeup Session
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#a73a52] to-[#7d2238] text-white">
              <FiArrowRight size={18} />
            </span>
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white lg:hidden"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="mb-4 rounded-2xl border border-white/10 bg-black/80 p-5 backdrop-blur-md lg:hidden">
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => {
                      setActive(link.label);
                      setOpen(false);
                    }}
                    className={`block rounded-lg px-3 py-3 text-base font-medium ${
                      active === link.label ? "bg-white/10 text-[#e0584f]" : "text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center justify-between rounded-full bg-gradient-to-r from-[#fbd3c9] to-[#f2a799] py-2 pl-6 pr-2 text-sm font-semibold text-[#5a1f26]"
            >
              Book a Makeup Session
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#a73a52] to-[#7d2238] text-white">
                <FiArrowRight size={16} />
              </span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}