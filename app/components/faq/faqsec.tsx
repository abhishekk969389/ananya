"use client";

import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

type Faq = { question: string; answer: string };

import { site } from "@/data/index";

function FaqItem({
  faq,
  id,
  open,
  onToggle,
}: {
  faq: Faq;
  id: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-[0_4px_14px_rgba(184,11,62,0.08)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        id={`${id}-button`}
        className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors duration-300 ${
          open ? "bg-[#B0093A] text-white" : "text-[#14172B]"
        }`}
      >
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
            open ? "bg-white text-[#B0093A]" : "bg-[#FCE4EA] text-[#B80B3E]"
          }`}
        >
          ?
        </span>
        <span className="flex-1 text-sm font-medium leading-snug sm:text-[15px]">
          {faq.question}
        </span>
        {open ? (
          <FiMinus className="shrink-0 text-lg" />
        ) : (
          <FiPlus className="shrink-0 text-lg text-[#B80B3E]" />
        )}
      </button>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-4 pb-4 pt-3 text-sm leading-relaxed text-slate-600">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const { eyebrow, title, titleHighlight, description, leftFaqs, rightFaqs } = site.faq;
  const [openId, setOpenId] = useState<string | null>("left-0");

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="w-full mt-8 sm:mt-10 md:mt-12 lg:mt-14">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-14 xl:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[760px] text-center"
        >
          <div className="flex items-center justify-center gap-4">
            <span className="h-[2px] w-10 bg-[#B80B3E]" />
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#B80B3E]">
              {eyebrow}
            </p>
            <span className="h-[2px] w-10 bg-[#B80B3E]" />
          </div>

          <h2 className="mt-1 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl text-[#14172B]">
            {title}
            <span className="text-[#B80B3E]">{titleHighlight}</span>
          </h2>

          <p className="mx-auto mt-2 max-w-[640px] text-xs sm:text-sm md:text-base text-slate-500">
            {description}
          </p>
        </motion.div>

        {/* Accordion columns */}
        <div className="mt-10 grid items-start gap-3 lg:grid-cols-2 lg:gap-x-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            {leftFaqs.map((faq, i) => {
              const id = `left-${i}`;
              return (
                <FaqItem
                  key={id}
                  id={id}
                  faq={faq}
                  open={openId === id}
                  onToggle={() => toggle(id)}
                />
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            {rightFaqs.map((faq, i) => {
              const id = `right-${i}`;
              return (
                <FaqItem
                  key={id}
                  id={id}
                  faq={faq}
                  open={openId === id}
                  onToggle={() => toggle(id)}
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}