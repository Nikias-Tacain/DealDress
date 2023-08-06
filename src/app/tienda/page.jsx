'use client'
import TiendaNavBar from "./components/TiendaNavBar";
import ProductList from "./components/allProducts";
import styles from './components/CardTienda.module.css'
import CarrouselImgs from "./components/CarrouselImgs";

function page() {
    return(
        <>
            <CarrouselImgs />
            <TiendaNavBar />
            <div>
                <ProductList/>
            </div>
        </>
    )
}
export default page;