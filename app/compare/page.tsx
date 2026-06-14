import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
export default function Compare() {
    return (
        <div>
            <Header />
            <main className="container mx-auto mt-20 flex w-fit flex-col items-center justify-center mb-30">
                <h1 className="text-5xl font-bold">Compare</h1>
                <div className="h-2"></div>
                <p className="text-2xl">Compare different cars and find the best one for you.</p>
            </main>
            <Footer />
        </div>
    );
}