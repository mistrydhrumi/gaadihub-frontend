import Header from "@/components/common/header";
import { supabase } from "@/lib/supabase";

export default async function Cars() {
    const { data: cars, error } = await supabase
        .from("cars")
        .select("*");

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <>
            <Header />
            <div>
                {cars?.map((car) => (
                    <div key={car.id}>
                        <h2>{car.brand}</h2>
                        <p>{car.model}</p>
                        <p>₹{car.original_price}</p>
                    </div>
                ))}
            </div>
        </>
    );
}