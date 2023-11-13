import ProductList from "./components/allProducts";
import CarrouselImgs from "./components/CarrouselImgs";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";

function page() {
    return(
        <>
            <CarrouselImgs />
            <div>
                <ProductList/>
            </div>
            <FloatingWhatsAppButton />
        </>
    )
}
export default page;