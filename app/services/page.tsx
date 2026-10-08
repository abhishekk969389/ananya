import SubBanner from "../components/subbanner";
import Services from "../components/services";
import Testimonials from "../components/testimonial";
import Brands from "../components/brands";

export default function ServicesPage() {
  return (
    <main>
      <SubBanner pageName="services" />
      <Services />
      <Testimonials/>
      <Brands/>
    </main>
  );
}
