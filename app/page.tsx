import Image from "next/image";
import Banner from "./components/banner";
import About from "./components/about";
import Services from "./components/services";
import Portfolio from "./components/portfolio";
import Testimonials from "./components/testimonial";
import Brands from "./components/brands";

export default function Home() {
  return (
 <>
 <Banner/>
 <About/>
 <Services/>
 <Portfolio/>
 <Testimonials/>
 <Brands/>
 </>
  );
}
