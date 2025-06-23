'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './buzosCamperasMujer.module.css';

export default function ProductCard({ item }) {
  return (
    <section className={styles.cardProduct}>
      <div className={styles.divProductImg}>
        <Link href={`/tienda/${item.id}`}>
          <a>
            <article className={styles.imgProduct}>
              <Image
                src={item.image}
                alt={item.nombre}
                width={500} // ajustar según diseño
                height={300}
                loading="lazy"
                style={{ objectFit: 'cover', borderRadius: '8px' }}
              />
            </article>
          </a>
        </Link>
      </div>

      <article className={styles.cardProductDiv}>
        <div>
          <Link href={`/tienda/${item.id}`}>
            <a>
              <article>
                <h2>{item.nombre}</h2>
                <p>$ {item.precio}</p>
              </article>
            </a>
          </Link>
        </div>
      </article>
    </section>
  );
}
