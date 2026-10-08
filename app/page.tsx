import Image from "next/image";
import Navbar from "./components/navbar";
import Banner from "./components/banner";
import About from "./components/about";
import Services from "./components/services";
import Portfolio from "./components/portfolio";
import Testimonials from "./components/testimonial";
import Brands from "./components/brands";
import Footer from "./components/footer";

export default function Home() {
  return (
 <>
 <Navbar/>
 <Banner/>
 <About/>
 <Services/>
 <Portfolio/>
 <Testimonials/>
 <Brands/>
 <Footer/>
 </>
  );
}
