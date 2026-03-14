import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import OurOtherSites from "@/components/OurOtherSites";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-cream-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <Navbar />
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-20">

        <FeatureCards />

        <OurOtherSites />

      </main>
      <Footer />
    </div>
  );
}
