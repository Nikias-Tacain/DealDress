import HeaderHubCarrousel from './components/HeaderHubCarrousel'
import SobreNosotros from './components/SobreNosotros'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import ProductsHub from './components/ProductsHub';
import FloatingWhatsAppButton from './tienda/components/FloatingWhatsAppButton';
import Link from 'next/link';
import styles from './components/ProductsHub.module.css'
import MetodosPago from './components/MetodosPago';
import Image from 'next/image';
config.autoAddCss = false;
export default function page() {
    return(
        <>
                    <header className={styles.headerHub}>
            <Link href='/'>
                <Image src="/iconoDealDress.png" alt="Logo Deal Dress" width={350} height={350}/>
            </Link>
        </header>
            <article className={styles.buttonTienda}>
                <Link href='/tienda'>
                    <p>IR LA TIENDA</p>
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