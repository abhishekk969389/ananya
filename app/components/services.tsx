import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import {
  PiCamera,
  PiChatCircleDots,
  PiCrown,
  PiHeart,
  PiMagicWand,
  PiSparkle,
} from "react-icons/pi";

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;

const services = [
  {
    icon: PiCrown,
    title: "Bridal Makeup",
    desc: "Make your special day more beautiful with a stunning bridal look tailored to your style and personality.",
    image: unsplash("photo-1583391733956-3750e0ff4e8b"),
  },
  {
    icon: PiSparkle,
    title: "Party Makeup",
    desc: "Get flawless and long-lasting party makeup for weddings, events, and special occasions.",
    image: unsplash("photo-1522335789203-aabd1fc54bc9"),
  },
  {
    icon: PiHeart,
    title: "Engagement Makeup",
    desc: "Create a picture-perfect look for your engagement with elegant and radiant makeup.",
    image: unsplash("photo-1487412947147-5cebf100ffc2"),
  },
  {
    icon: PiCamera,
    title: "Pre-Wedding Shoots",
    desc: "Look your best in every frame with customised makeup for pre-wedding photoshoots.",
    image: unsplash("photo-1512496015851-a90fb38ba796"),
  },
  {
    icon: PiMagicWand,
    title: "HD Makeup",
    desc: "Get a flawless, camera-ready look with high-definition makeup for a smooth and radiant finish.",
    image: unsplash("photo-1516975080664-ed2fc6a32937"),
  },
  {
    icon: PiChatCircleDots,
    title: "Makeup Consultation",
    desc: "Get expert advice on the best makeup looks, products and skincare for your special occasion.",
    image: unsplash("photo-1596462502278-27bfdc403348"),
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="mt-8 sm:mt-10 md:mt-12 lg:mt-14"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-14 xl:px-12">
        {/* Heading */}
        <div className="mx-auto max-w-[760px] text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-[2px] w-10 bg-[#e9a5b0]" />
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c02a58]">
              Our Services
            </p>
            <span className="h-[2px] w-10 bg-[#e9a5b0]" />
          </div>

          <h2 className="mt-1 font-serif text-3xl font-bold text-[#1d1a1b] sm:text-4xl lg:text-5xl">
            Beauty <span className="text-[#c02a58]">Services</span>
          </h2>

          <p className="mx-auto mt-2 max-w-[640px] text-xs text-slate-500 sm:text-sm md:text-base">
            From bridal beauty to everyday glam, I offer a range of professional makeup
            services to make you look and feel your absolute best for every occasion.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc, image }) => (
            <article
              key={title}
              className="flex flex-col gap-4 rounded-2xl bg-white/75 p-3 shadow-[0_8px_30px_rgba(192,42,88,0.06)] sm:flex-row sm:p-4"
            >
              <div className="relative h-60 w-full shrink-0 overflow-hidden rounded-xl sm:h-auto sm:min-h-[230px] sm:w-[42%]">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(min-width: 1024px) 170px, (min-width: 640px) 200px, 90vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-center py-1 pr-1">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-[#fde3e6] text-[#c02a58]">
                  <Icon size={26} />
                </span>

                <h3 className="mt-4 font-serif text-lg font-bold text-[#1d1a1b]">
                  {title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-[#2b2627] sm:text-sm">
                  {desc}
                </p>

                <Link
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#c02a58] transition hover:gap-3"
                >
                  Read More
                  <FiArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}