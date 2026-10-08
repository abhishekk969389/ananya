import SubBanner from "../components/subbanner";
import Brands from "../components/brands";
import Contact from "../components/contact/contactsec";

export default function ContactPage() {
  return (
    <main>
      <SubBanner pageName="contact" />
      <Contact/>
      <Brands/>
    </main>
  );
}
