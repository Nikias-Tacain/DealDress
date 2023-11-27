import ProductList from "./components/allProducts";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";

function page() {
    return(
        <>
            <div>
                <ProductList/>
            </div>
            <FloatingWhatsAppButton />
        </>
    )
}
export default page;