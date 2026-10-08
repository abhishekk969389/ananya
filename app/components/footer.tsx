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

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#portfolio" },
  { label: "Packages", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact Us", href: "#contact" },
];

const services = [
  "Bridal Makeup",
  "Party Makeup",
  "Engagement Makeup",
  "Pre-Wedding Makeup",
  "HD & Airbrush Makeup",
  "Saree Draping",
  "Hair Styling",
];

const socials = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaYoutube, label: "YouTube", href: "#" },
  { icon: FaWhatsapp, label: "WhatsApp", href: "#" },
];

const contacts = [
  { icon: FaLocationDot, lines: ["123 Beauty Street,", "New Delhi, India"] },
  { icon: FaPhone, lines: ["+91 9876543210"] },
  { icon: FaEnvelope, lines: ["info@ananyamakeupartist.com"] },
  { icon: FaClock, lines: ["Mon - Sun: 9:00 AM - 8:00 PM"] },
];

const headingClass = "font-serif text-xl font-semibold text-[#f4a08f] sm:text-2xl";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#17171c] text-white mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-14 xl:px-12">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.25fr] lg:gap-0 lg:py-14">
          {/* Brand */}
          <div className="lg:pr-8">
            <Link href="#home" className="inline-block">
              <Image
                src="/logo.png"
                alt="Ananya Makeup Artist"
                width={360}
                height={130}
                className="h-auto w-[260px] sm:w-[300px]"
              />
            </Link>

            <p className="mt-3 max-w-[320px] text-sm leading-relaxed text-white/90 sm:text-base">
              Professional makeup artist creating beautiful, confident and timeless looks
              for every special occasion.
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#8c3f4f] text-white transition hover:bg-[#f4a08f] hover:text-[#17171c]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:border-l lg:border-[#c79c8d]/60 lg:pl-8">
            <h3 className={headingClass}>Quick Links</h3>
            <ul className="mt-5 space-y-3.5">
              {quickLinks.map((l) => (
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
          </div>

          {/* Services */}
          <div className="lg:border-l lg:border-[#c79c8d]/60 lg:pl-8">
            <h3 className={headingClass}>Our Services</h3>
            <ul className="mt-5 space-y-3.5">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="#services"
                    className="flex items-center gap-4 text-sm text-white/90 transition hover:text-[#f4a08f] sm:text-base"
                  >
                    <FaChevronRight size={11} className="text-[#f9c4b6]" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:border-l lg:border-[#c79c8d]/60 lg:pl-8">
            <h3 className={headingClass}>Contact Us</h3>
            <ul className="mt-5 space-y-4">
              {contacts.map(({ icon: Icon, lines }) => (
                <li key={lines[0]} className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f9c4b6] text-[#17171c]">
                    <Icon size={18} />
                  </span>
                  <span className="break-words text-sm text-white/90 sm:text-base">
                    {lines.map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#c79c8d]/60">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-14 xl:px-12">
          <p className="text-xs text-white/90 sm:text-sm md:text-base">
            © 2026 Ananya Makeup Artist. All Rights Reserved.
          </p>
          <a
            href="#home"
            aria-label="Back to top"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f9c4b6] text-[#17171c] transition hover:bg-[#f4a08f] sm:h-11 sm:w-11"
          >
            <FaChevronUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}