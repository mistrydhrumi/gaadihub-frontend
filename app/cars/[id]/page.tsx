import CarFeatures from "@/components/cars-details/CarFeatures";
import CarGallery from "@/components/cars-details/CarGallery";
import CarImageCarousel from "@/components/cars-details/CarImageCarousel";
import CarOverview from "@/components/cars-details/CarOverview";
import CarPriceCard from "@/components/cars-details/CarPriceCard";
import CarSpecifications from "@/components/cars-details/CarSpecifications";
import EmiCalculator from "@/components/cars-details/EmiCalculator";
import Header from "@/components/common/header";

export default function CarDetailsPage() {
  return (<>
       <Header/>
    <div className="container mx-auto py-10 px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

     
        {/* Left Side */}
        <div className="lg:col-span-8 space-y-6">
        <CarImageCarousel/>
        <CarOverview/>
        <CarFeatures/>
        <CarSpecifications/>
        <CarGallery/>
        <EmiCalculator/>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <CarPriceCard/>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}