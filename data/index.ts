import ananyaData from "./ananya.json";

export type RawAnanyaData = typeof ananyaData;

export interface SectionProps<T = unknown> {
  data?: T;
  className?: string;
  contentClassName?: string;
  variant?: string;
  isEditable?: boolean;
  onUpdate?: (newData: Partial<T>) => void;
}

const sec = ananyaData.AnanyaMakeup.sections;

export type AnanyaBrandData        = typeof sec.Brand.variants.AnanyaBrand1;
export type AnanyaHeaderData       = typeof sec.Header.variants.AnanyaHeader1;
export type AnanyaBannerData       = typeof sec.Banner.variants.AnanyaBanner1;
export type AnanyaAboutSectionData = typeof sec.AboutSection.variants.AnanyaAboutSection1;
export type AnanyaSubBannerData    = typeof sec.SubBanner.variants.about;
export type AnanyaServicesData     = typeof sec.Services.variants.AnanyaServices1;
export type AnanyaPortfolioData    = typeof sec.Portfolio.variants.AnanyaPortfolio1;
export type AnanyaTestimonialData  = typeof sec.Testimonial.variants.AnanyaTestimonial1;
export type AnanyaBrandsData       = typeof sec.Brands.variants.AnanyaBrands1;
export type AnanyaFooterData       = typeof sec.Footer.variants.AnanyaFooter1;

export type AnanyaFaqData          = typeof sec.Faq.variants.AnanyaFaq1;
export type AnanyaMakeupStatsData  = typeof sec.MakeupStats.variants.AnanyaMakeupStats1;
export type AnanyaWhyChooseUsData  = typeof sec.WhyChooseUs.variants.AnanyaWhyChooseUs1;
export type AnanyaMakeupPackagesData = typeof sec.MakeupPackages.variants.AnanyaMakeupPackages1;
export type AnanyaMakeupPricingData = typeof sec.MakeupPricing.variants.AnanyaMakeupPricing1;
export type AnanyaAppointmentData  = typeof sec.AppointmentSection.variants.AnanyaAppointment1;
export type AnanyaContactData      = typeof sec.ContactSection.variants.AnanyaContact1;

export const site = {
  brand:       sec.Brand.variants.AnanyaBrand1,
  navbar:      sec.Header.variants.AnanyaHeader1,
  banner:      sec.Banner.variants.AnanyaBanner1,
  about:       sec.AboutSection.variants.AnanyaAboutSection1,
  subbanner:   sec.SubBanner.variants,
  ourServices: sec.Services.variants.AnanyaServices1,
  portfolio:   sec.Portfolio.variants.AnanyaPortfolio1,
  testimonial: sec.Testimonial.variants.AnanyaTestimonial1,
  brands:      sec.Brands.variants.AnanyaBrands1,
  faq:         sec.Faq.variants.AnanyaFaq1,
  makeupStats: sec.MakeupStats.variants.AnanyaMakeupStats1,
  whyChooseUs: sec.WhyChooseUs.variants.AnanyaWhyChooseUs1,
  makeupPackages: sec.MakeupPackages.variants.AnanyaMakeupPackages1,
  makeupPricing: sec.MakeupPricing.variants.AnanyaMakeupPricing1,
  appointment: sec.AppointmentSection.variants.AnanyaAppointment1,
  contact:     sec.ContactSection.variants.AnanyaContact1,
  footer:      sec.Footer.variants.AnanyaFooter1,
};

export default ananyaData;
