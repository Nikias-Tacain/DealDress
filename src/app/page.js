import HeaderHubCarrousel from './components/HeaderHubCarrousel'
import SobreNosotros from './components/SobreNosotros'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import ProductsHub from './components/ProductsHub';
import FloatingWhatsAppButton from './tienda/components/FloatingWhatsAppButton';
config.autoAddCss = false;
export default function page() {
    return(
        <>
            <HeaderHubCarrousel />
            <ProductsHub />
            <SobreNosotros />
            <FloatingWhatsAppButton />
        </>
    )
}