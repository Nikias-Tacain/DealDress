import styles from './HeaderHub.module.css'
import Link from 'next/link';
import Image from 'next/image';
export default function HeaderHub() {
    return(
        <header className={styles.headerHub}>
            <Link href='/'>
                <Image src="/favicon.png" alt="Logo Deal Dress" width={300} height={220}/>
            </Link>
        </header>
    )
}