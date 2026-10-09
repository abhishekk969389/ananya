import About from "../components/about";
import MakeupWhyChoose from "../components/about/whychoose";
import Brands from "../components/brands";
import SubBanner from "../components/subbanner";

export default function AboutPage() {
  return (
    <main>
      <SubBanner />
      <About hideButton />
      <MakeupWhyChoose/>
      <Brands/>
    </main>
  );
}
