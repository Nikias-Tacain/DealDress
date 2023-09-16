import HeaderHubCarrousel from './components/HeaderHubCarrousel'
import HeaderHubNavBar from './components/HeaderHubNavBar'
import SobreNosotros from './components/SobreNosotros'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import ProductsHub from './components/ProductsHub';
import FloatingWhatsAppButton from './tienda/components/FloatingWhatsAppButton';
import CorreoHome from './components/correoHome';
config.autoAddCss = false;
export default function page() {
    return(
        <>
            <HeaderHubNavBar />
            <HeaderHubCarrousel />
            <ProductsHub />
            <SobreNosotros />
            <CorreoHome />
            <FloatingWhatsAppButton />
        </>
    )
}