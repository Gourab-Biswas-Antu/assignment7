import AllProductsSection from "@/components/AllProductsSection";
import PriceDecreaseSection from "@/components/PriceDecreaseSection";
import PriceIncreaseSection from "@/components/PriceIncreaseSection";
import HeroSection from "@/components/Hero";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PriceIncreaseSection />
      <PriceDecreaseSection />
      <AllProductsSection />
    </div>
  );
}
