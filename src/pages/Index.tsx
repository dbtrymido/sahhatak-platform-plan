import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import SpecialtiesGrid from "@/components/home/SpecialtiesGrid";
import TopDoctors from "@/components/home/TopDoctors";
import NearbyPharmacies from "@/components/home/NearbyPharmacies";
import HowItWorks from "@/components/home/HowItWorks";
import CTABanner from "@/components/home/CTABanner";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <SpecialtiesGrid />
        <TopDoctors />
        <NearbyPharmacies />
        <HowItWorks />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
