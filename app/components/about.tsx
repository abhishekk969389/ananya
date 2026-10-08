import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { PiDiamond, PiPaintBrush, PiStar, PiUsersThree } from "react-icons/pi";

const stats = [
  { icon: PiDiamond, value: "5+", label: "Years of Experience" },
  { icon: PiUsersThree, value: "300+", label: "Happy Clients" },
  { icon: PiPaintBrush, value: "200+", label: "Makeup Looks" },
  { icon: PiStar, value: "50+", label: "Events Covered" },
];

const mainImage =
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1000&q=80";
const brushImage =
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80";

export default function About() {
  return (
    <section
      id="about"
      className="mt-8 sm:mt-10 md:mt-12 lg:mt-14"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-14 xl:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: image collage */}
          <div className="relative mx-auto h-[420px] w-full max-w-[600px] sm:h-[520px] lg:h-[580px]">
            {/* Pink block */}
            <div className="absolute left-0 top-[10%] h-[58%] w-[24%] bg-[#e9a5b0]/80" />

            {/* Top outline frame */}
            <div className="absolute left-[8%] top-0 h-[34%] w-[50%] border border-[#d6a98a]" />

            {/* Bottom-right outline frame */}
            <div className="absolute bottom-[3%] right-0 h-[52%] w-[40%] border border-[#d6a98a]" />

            {/* Bottom pink bar */}
            <div className="absolute bottom-0 left-[10%] h-[6%] w-[52%] bg-[#f0b9c0]" />

            {/* Main image */}
            <div className="absolute left-[15%] top-[7%] h-[86%] w-[76%] overflow-hidden shadow-xl">
              <Image
                src={mainImage}
                alt="Makeup artist portrait"
                fill
                sizes="(min-width: 1024px) 420px, 70vw"
                className="object-cover"
              />
            </div>

            {/* Small brush image */}
            <div className="absolute bottom-[5%] left-[2%] h-[34%] w-[30%] overflow-hidden border-[6px] border-white shadow-lg">
              <Image
                src={brushImage}
                alt="Makeup brushes"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: content */}
          <div>
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d98b94]">
                About Me
              </p>
              <span className="h-[2px] w-10 bg-[#e9a5b0]" />
            </div>

            <h2 className="mt-1 font-serif text-3xl font-bold text-[#1d1a1b] sm:text-4xl lg:text-5xl">
              Turning Every Occasion Into a{" "}
              <span className="italic text-[#c02a58]">More Beautiful You</span>
            </h2>

            <span className="mt-5 block h-[2px] w-16 bg-[#e9a5b0]" />

            <div className="mt-6 space-y-3 text-xs text-[#2b2627] sm:text-sm md:text-base">
              <p>
                I&apos;m <strong>Aarti Sharma, a professional makeup artist</strong> with a
                passion for beauty, creativity and making people feel confident. I
                specialize in bridal makeup, party makeup, and personalized beauty looks
                tailored to your style and occasion.
              </p>
              <p>
                With attention to detail, high-quality products and the latest
                techniques, I aim to enhance your natural beauty and create looks that
                are elegant, timeless and truly you.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-y-8 sm:grid-cols-4">
              {stats.map(({ icon: Icon, value, label }, i) => (
                <div
                  key={label}
                  className={`flex flex-col items-center px-2 text-center ${
                    i !== 0 ? "sm:border-l sm:border-[#e9b3ba]" : ""
                  }`}
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-[#fbdfe0] text-[#c02a58]">
                    <Icon size={28} />
                  </span>
                  <p className="mt-3 font-serif text-2xl font-bold text-[#c02a58] sm:text-3xl">
                    {value}
                  </p>
                  <p className="mt-1 text-xs text-[#2b2627] sm:text-sm">{label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="#contact"
              className="mt-8 inline-flex items-center gap-4 rounded-full bg-[#c02a58] py-2 pl-7 pr-2 text-sm font-semibold text-white transition hover:bg-[#a82049]"
            >
              Know More About Me
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#c02a58]">
                <FiArrowRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}