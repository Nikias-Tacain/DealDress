'use client'
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';
import CorreoHome from '@/app/components/CorreoHome';
import { db } from '@/app/firebase/config';
import styles from './CardTienda.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const productosRef = collection(db, 'products');

    getDocs(productosRef).then((resp) => {
      setProducts(
        resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoria.includes(selectedCategory))
    : products.filter((product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const renderProducts = () =>
    filteredProducts.map((item) => (
      <section className={styles.cardProduct} key={item.id}>
        <div className={styles.divProductImg}>
          <Link href={`/tienda/${item.id}`}>
            <article className={styles.imgProduct}>
              <img src={item.image} alt={item.nombre} />
            </article>
          </Link>
        </div>
        <article className={styles.cardProductDiv}>
          <div>
            <Link href={`/tienda/${item.id}`}>
              <article>
                <h2>{item.nombre}</h2>
                <p>$ {item.precio}</p>
              </article>
            </Link>
          </div>
        </article>
      </section>
    ));

  return (
    <>
      <section className={styles.categoriesButtonClick}>
        <div className={styles.categoriesButtonClickInput}>
          <label>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </label>
          <input
            type="text"
            placeholder="Buscar productos"
            value={searchTerm}
            style={{
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '10px',
              width: '300px',
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <CorreoHome />
        <br />
      </section>

      <div className={styles.card}>{renderProducts()}</div>
    </>
  );
};

export default ProductList;
