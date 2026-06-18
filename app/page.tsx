import { BrandsList } from "@/components/common/brands-list";
import ElectricCarsSection from "@/components/common/ElectricCarsSection";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import Hero from "@/components/common/hero";
export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <BrandsList />
      <ElectricCarsSection />
      <Footer />
    </>
  );
}
