import SubBanner from "../components/subbanner";
import Brands from "../components/brands";
import Faq from "../components/faq/faqsec";

export default function FaqPage() {
  return (
    <main>
      <SubBanner pageName="faq" />
      <Faq/>
      <Brands />
    </main>
  );
}
