"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import {
  FiArrowRight,
  FiCalendar,
  FiChevronDown,
  FiClock,
  FiGrid,
  FiMail,
  FiMessageSquare,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import { motion } from "framer-motion";

import { site } from "@/data/index";

const groupClass =
  "flex items-stretch overflow-hidden rounded-md border border-rose-100 bg-white transition focus-within:border-[#B80B3E] focus-within:ring-2 focus-within:ring-[#B80B3E]/20";

const iconTileClass =
  "flex w-11 shrink-0 items-center justify-center bg-[#FCE4EA] text-lg text-[#B80B3E]";

const inputClass =
  "w-full min-w-0 bg-transparent px-3 py-3 text-sm text-[#14172B] outline-none placeholder:text-slate-400";

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold text-[#14172B]">
        {label}
        {required && <span className="text-[#B80B3E]"> *</span>}
      </span>
      {children}
    </label>
  );
}

export default function Appointment() {
  const { eyebrow, title, titleHighlight, description, services, times, image, form: formData } = site.appointment;
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // TODO: send `data` to your API route / email service here
    console.log("Appointment request:", data);

    form.reset();
    setSent(true);
  };

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

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6">
          {/* Left: image with pink corner blocks */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative min-h-[380px] sm:min-h-[460px]"
          >
            <span className="absolute -left-3 -top-3 h-24 w-24 rounded-md bg-[#F7A8B8]" />
            <span className="absolute -bottom-3 -right-3 h-24 w-24 rounded-md bg-[#F7A8B8]" />

            <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-rose-100 bg-white p-5 shadow-[0_8px_30px_rgba(184,11,62,0.08)] sm:p-7"
          >
            <h3 className="font-serif text-2xl font-bold sm:text-3xl text-[#14172B]">
              {formData.title}<span className="text-[#B80B3E]">{formData.titleHighlight}</span>
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              {formData.description}
            </p>

            <form onSubmit={handleSubmit} className="mt-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={formData.fields.name.label} required>
                  <div className={groupClass}>
                    <span className={iconTileClass}>
                      <FiUser />
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder={formData.fields.name.placeholder}
                      className={inputClass}
                    />
                  </div>
                </Field>

                <Field label={formData.fields.email.label} required>
                  <div className={groupClass}>
                    <span className={iconTileClass}>
                      <FiMail />
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder={formData.fields.email.placeholder}
                      className={inputClass}
                    />
                  </div>
                </Field>

                <Field label={formData.fields.phone.label} required>
                  <div className={groupClass}>
                    <span className={iconTileClass}>
                      <FiPhone />
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      autoComplete="tel"
                      placeholder={formData.fields.phone.placeholder}
                      className={inputClass}
                    />
                  </div>
                </Field>

                <Field label={formData.fields.date.label} required>
                  <div className={groupClass}>
                    <span className={iconTileClass}>
                      <FiCalendar />
                    </span>
                    <input
                      type="date"
                      name="date"
                      required
                      className={inputClass}
                    />
                  </div>
                </Field>

                <Field label={formData.fields.time.label} required>
                  <div className={groupClass}>
                    <span className={iconTileClass}>
                      <FiClock />
                    </span>
                    <select
                      name="time"
                      required
                      defaultValue=""
                      className={`${inputClass} appearance-none pr-9 invalid:text-slate-400`}
                    >
                      <option value="" disabled>
                        {formData.fields.time.placeholder}
                      </option>
                      {times.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  </div>
                </Field>

                <Field label={formData.fields.service.label} required>
                  <div className={`${groupClass} relative`}>
                    <span className={iconTileClass}>
                      <FiGrid />
                    </span>
                    <select
                      name="service"
                      required
                      defaultValue=""
                      className={`${inputClass} appearance-none pr-9 invalid:text-slate-400`}
                    >
                      <option value="" disabled>
                        {formData.fields.service.placeholder}
                      </option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  </div>
                </Field>

                <Field
                  label={formData.fields.message.label}
                  className="sm:col-span-2"
                >
                  <div className={groupClass}>
                    <span className={`${iconTileClass} items-start pt-3.5`}>
                      <FiMessageSquare />
                    </span>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder={formData.fields.message.placeholder}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </Field>
              </div>

              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#B80B3E] px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#9A0933]"
              >
                {formData.submitButton}
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm text-[#B80B3E]">
                  <FiArrowRight />
                </span>
              </button>

              {sent && (
                <p
                  role="status"
                  className="mt-4 rounded-lg bg-[#FCE4EA] px-4 py-3 text-center text-sm font-medium text-[#14172B]"
                >
                  {formData.successMessage}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}