import { About } from "@/components/root/About";
import { FeaturedProperties } from "@/components/root/FeaturedProperties";
import { Hero } from "@/components/root/Hero";
import { PropertySearch } from "@/components/root/PropertySearch";
import { ResponsiveDrawer } from "@/components/root/ResponsiveDrawer";
import { SellYourHome } from "@/components/root/SellYourHome";
import { siteinfo } from "@/config/siteinfo";
import { getServerSideFeaturedProperties } from "@/data-access-layer/properties/server-side-property-queries";
import { Metadata } from "next";
import { Footer } from "@/components/root/Footer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: siteinfo.title,
  description:
    "Find your perfect home with Earth & Home Real Estate. Browse luxury properties, family homes, and rental listings. Expert real estate services, local market knowledge, and personalized property search assistance.",
  keywords: [
    "real estate",
    "homes for sale",
    "property listings",
    "house rentals",
    "luxury properties",
    "family homes",
    "real estate agent",
    "property search",
    "home buying",
    "property rental",
  ],
  openGraph: {
    title: `${siteinfo.title} - ${siteinfo.tagline}`,
    description:
      "Find your perfect home with Earth & Home Real Estate. Browse luxury properties, family homes, and rental listings.",
    type: "website",
  },
};

export default async function Home() {
  const featuredResult = await getServerSideFeaturedProperties({ limit: 1 });
  const featuredProperty =
    featuredResult.success && featuredResult.properties.length > 0
      ? featuredResult.properties[0]
      : null;

  return (
    <ResponsiveDrawer isLandingPage>
      <main className="min-h-screen ">
        <Hero featuredProperty={featuredProperty} />
        {/* Search */}
        <PropertySearch />
        {/* Featured */}
        <FeaturedProperties />
        {/* Sell */}
        <SellYourHome />

        {/* About */}
        <About />

        {/* Footer */}
        <Footer />
      </main>
    </ResponsiveDrawer>
  );
}
