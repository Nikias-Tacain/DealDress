import HeaderHubCarrousel from './components/HeaderHubCarrousel'
import SobreNosotros from './components/SobreNosotros'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import ProductsHub from './components/ProductsHub';
import FloatingWhatsAppButton from './tienda/components/FloatingWhatsAppButton';
import Link from 'next/link';
import styles from './components/ProductsHub.module.css'
import MetodosPago from './components/MetodosPago';
config.autoAddCss = false;
export default function page() {
    return(
        <>
            <article className={styles.buttonTienda}>
                <Link href='/tienda'>
                    <p>INGRESAR A LA TIENDA</p>
                </Link>
            </article>
            <HeaderHubCarrousel />
            <ProductsHub />
            <SobreNosotros />
            <MetodosPago />
            <FloatingWhatsAppButton />
        </>
    )
}