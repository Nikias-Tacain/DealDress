import TiendaNavBar from "./components/TiendaNavBar";
import ProductList from "./components/allProducts";
import CarrouselImgs from "./components/CarrouselImgs";
import CorreoHome from "../components/CorreoHome";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";

function page() {
    return(
        <>
            <CarrouselImgs />
            <TiendaNavBar />
            <div>
                <ProductList/>
            </div>
            <CorreoHome />
            <FloatingWhatsAppButton />
        </>
    )
}
export default page;