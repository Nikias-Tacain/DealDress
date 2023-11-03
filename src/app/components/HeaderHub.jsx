import styles from './HeaderHub.module.css'
import Link from 'next/link';
import Image from 'next/image';
export default function HeaderHub() {
    return(
        <header className={styles.headerHub}>
            <Link href='/'>
                <Image src="/iconoDealDress.png" alt="Logo Deal Dress" width={350} height={350}/>
            </Link>
        </header>
    )
}