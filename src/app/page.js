import HeaderHubCarrousel from './components/HeaderHubCarrousel'
import HeaderHubNavBar from './components/HeaderHubNavBar'
import SobreNosotros from './components/SobreNosotros'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import ProductsHub from './components/ProductsHub';
config.autoAddCss = false;
export default function page() {
    return(
        <>
            <HeaderHubNavBar />
            <HeaderHubCarrousel />
            <ProductsHub />
            <SobreNosotros />
        </>
    )
}