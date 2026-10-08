"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaChevronRight,
  FaChevronUp,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaClock, FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import { motion } from "framer-motion";
import { site } from "@/data/index";
import type { AnanyaFooterData } from "@/data/index";

const footerData: AnanyaFooterData = site.footer;

const iconMap: Record<string, any> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  youtube: FaYoutube,
  whatsapp: FaWhatsapp,
  address: FaLocationDot,
  phone: FaPhone,
  email: FaEnvelope,
  hours: FaClock,
};

const headingClass = "font-serif text-xl font-semibold text-[#f4a08f] sm:text-2xl";

export default function Footer() {
  if (!footerData) return null;

  return (
    <footer id={footerData.id} className="bg-[#17171c] text-white mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-14 xl:px-12">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.25fr] lg:gap-0 lg:py-14">
          {/* Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:pr-8"
          >
            <Link href="/" className="inline-block">
              <Image
                src={footerData.logo.src}
                alt={footerData.logo.alt}
                width={footerData.logo.width}
                height={footerData.logo.height}
                className="h-auto w-[260px] sm:w-[300px]"
              />
            </Link>

            <p className="mt-3 max-w-[320px] text-sm leading-relaxed text-white/90 sm:text-base">
              {footerData.description}
            </p>

            <div className="mt-6 flex gap-3">
              {footerData.socialLinks.map(({ platform, label, url }) => {
                const Icon = iconMap[platform];
                return (
                  <a
                    key={label}
                    href={url}
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-full bg-[#8c3f4f] text-white transition hover:bg-[#f4a08f] hover:text-[#17171c]"
                  >
                    {Icon && <Icon size={16} />}
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:border-l lg:border-[#c79c8d]/60 lg:pl-8"
          >
            <h3 className={headingClass}>{footerData.quickLinks.title}</h3>
            <ul className="mt-5 space-y-3.5">
              {footerData.quickLinks.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-4 text-sm text-white/90 transition hover:text-[#f4a08f] sm:text-base"
                  >
                    <FaChevronRight size={11} className="text-[#f9c4b6]" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:border-l lg:border-[#c79c8d]/60 lg:pl-8"
          >
            <h3 className={headingClass}>{footerData.serviceLinks.title}</h3>
            <ul className="mt-5 space-y-3.5">
              {footerData.serviceLinks.links.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="flex items-center gap-4 text-sm text-white/90 transition hover:text-[#f4a08f] sm:text-base"
                  >
                    <FaChevronRight size={11} className="text-[#f9c4b6]" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:border-l lg:border-[#c79c8d]/60 lg:pl-8"
          >
            <h3 className={headingClass}>{footerData.contactInfo.title}</h3>
            <ul className="mt-5 space-y-4">
              {footerData.contactInfo.items.map(({ type, lines }) => {
                const Icon = iconMap[type];
                return (
                  <li key={lines[0]} className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f9c4b6] text-[#17171c]">
                      {Icon && <Icon size={18} />}
                    </span>
                    <span className="break-words text-sm text-white/90 sm:text-base">
                      {lines.map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#c79c8d]/60">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-14 xl:px-12">
          <p className="text-xs text-white/90 sm:text-sm md:text-base">
            {footerData.bottomBar.copyright}
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={footerData.bottomBar.backToTopLabel}
            className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full bg-[#f9c4b6] text-[#17171c] transition hover:bg-[#f4a08f] sm:h-11 sm:w-11"
          >
            <FaChevronUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}