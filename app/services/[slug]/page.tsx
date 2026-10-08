import { notFound } from "next/navigation";
import SubBanner from "@/app/components/subbanner";
import Brands from "@/app/components/brands";
import ServiceDetails from "@/app/components/servicedetails";
import ananyaData from "@/data/ananya.json";

export function generateStaticParams() {
  const serviceDetails = (ananyaData.AnanyaMakeup as any).ServiceDetails;
  if (!serviceDetails) return [];
  
  return Object.keys(serviceDetails).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const service = (ananyaData.AnanyaMakeup as any).ServiceDetails?.[resolvedParams.slug];
  if (!service) return {};
  
  return {
    title: service.seo.title,
    description: service.seo.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await params;
  const service = (ananyaData.AnanyaMakeup as any).ServiceDetails?.[resolvedParams.slug];

  if (!service) {
    notFound();
  }

  return (
    <main >
      <SubBanner pageName={"service-detail" as any} />
      <ServiceDetails service={service} />
      <Brands />
    </main>
  );
}
