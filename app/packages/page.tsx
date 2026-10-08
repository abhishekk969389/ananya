import Brands from "../components/brands";
import MakeupPackages from "../components/packages/package";
import MakeupPricing from "../components/packages/price";
import SubBanner from "../components/subbanner";

export default function PackagesPage() {
  return (
    <main>
      <SubBanner pageName="packages" />
      <MakeupPackages/>
      <MakeupPricing/>
      <Brands/>
    </main>
  );
}
