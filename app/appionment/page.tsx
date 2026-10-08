import SubBanner from "../components/subbanner";
import Brands from "../components/brands";
import Appointment from "../components/appionment/appionmentsec";

export default function AppointmentPage() {
  return (
    <main>
      <SubBanner pageName="appionment" />
      <Appointment/>
      <Brands />
    </main>
  );
}
