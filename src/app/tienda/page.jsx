import TiendaNavBar from "./components/TiendaNavBar";
import ProductList from "./components/allProducts";
import CarrouselImgs from "./components/CarrouselImgs";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";
import styles from './page.module.css'

function page() {
    return(
        <section className={styles.page}>
            <CarrouselImgs />
            <TiendaNavBar />
            <div>
                <ProductList/>
            </div>
            <FloatingWhatsAppButton />
        </section>
    )
}
export default page;