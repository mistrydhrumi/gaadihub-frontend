import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
export const metadata: Metadata = {
    title: "About Us",
};

export default function Aboutus() {
    return (
        <>
            <Header />
            <Footer />
        </>
    );
}