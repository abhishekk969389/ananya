import SubBanner from "../components/subbanner";
import Portfolio from "../components/portfolio";
import Brands from "../components/brands";

export default function PortfolioPage() {
  return (
    <main>
      <SubBanner pageName="portfolio" />
      <Portfolio hideButton />
      <Brands />
    </main>
  );
}
