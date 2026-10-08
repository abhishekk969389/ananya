"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

import { site } from "@/data/index";

export default function MakeupPricing() {
  const { packages, ctaLabel, ctaHref } = site.makeupPricing;
  return (
    <section className="w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-14 xl:px-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {packages.map(({ title, price, image, features }, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={title}
            >
              <article
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-rose-100 bg-white shadow-[0_6px_24px_rgba(184,11,62,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(184,11,62,0.16)]"
              >
              {/* Image */}
              <div className="relative h-[190px] w-full overflow-hidden sm:h-[200px]">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-center font-serif text-lg font-bold text-[#14172B] lg:text-xl">
                  {title}
                </h3>

                <p className="mt-3 rounded-md bg-[#FCE4EA] py-2 text-center text-2xl font-bold text-[#B80B3E]">
                  {price}
                </p>

                <ul className="mt-4 flex-1 space-y-2.5">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-[#14172B]"
                    >
                      <FaCheckCircle className="shrink-0 text-base text-[#B80B3E]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={ctaHref}
                  className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#B80B3E] px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-[#9A0933]"
                >
                  {ctaLabel}
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm text-[#B80B3E]">
                    <FiArrowRight />
                  </span>
                </Link>
              </div>
            </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}