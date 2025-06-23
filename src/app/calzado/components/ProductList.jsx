'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './calzado.module.css';

export default function ProductList({ products, searchTerm, selectedCategory }) {
  const filteredProducts = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return products
      .filter(product => product.categoria === selectedCategory)
      .filter(product => product.nombre.toLowerCase().includes(lowerSearch));
  }, [products, searchTerm, selectedCategory]);

  if (filteredProducts.length === 0) {
    return <p className={styles.noResults}>No se encontraron productos.</p>;
  }

  return (
    <div className={styles.card}>
      {filteredProducts.map(item => (
        <section className={styles.cardProduct} key={item.id}>
          <div className={styles.divProductImg}>
            <Link href={`/tienda/${item.id}`}>
              <a>
                <article className={styles.imgProduct}>
                  <Image
                    src={item.image}
                    alt={item.nombre}
                    width={500}
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
      ))}
    </div>
  );
}
