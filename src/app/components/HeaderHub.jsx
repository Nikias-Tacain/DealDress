import styles from './HeaderHub.module.css'
import Link from 'next/link';
import Image from 'next/image';
import ShoppingCartModal from '../tienda/components/ShoppingCart';
export default function HeaderHub() {
    return(
        <div>
            <div className={styles.varHeader}>
                <div className={styles.varHeaderDiv}>
                    <img src="/bars-solid.svg" alt="" className={styles.barList}/>
                </div>
                <ShoppingCartModal />
            </div>
            <header className={styles.headerHub}>
                <Link href='/'>
                    <Image src="/iconoDealDress.png" alt="Logo Deal Dress" width={350} height={350}/>
                </Link>
            </header>
        </div>

    )
}