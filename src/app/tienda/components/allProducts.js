'use client'
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import CorreoHome from '@/app/components/CorreoHome';
import { db } from '@/app/firebase/config';
import styles from './CardTienda.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import CarrouselImgs from './CarrouselImgs';

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

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.categoria.includes(selectedCategory) : true;
    const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderProducts = () =>
    filteredProducts.map((item) => (
      <section className={styles.cardProduct} key={item.id}>
        <div className={styles.divProductImg}>
          <Link href={`/tienda/${item.id}`}>
            <article className={styles.imgProduct}>
              <img src={item.image || '/placeholder.png'} alt={item.nombre} />
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
        <CarrouselImgs />
        <CorreoHome />
        <br />
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
              width: '450px',
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      <div className={styles.card}>{renderProducts()}</div>
    </>
  );
};

export default ProductList;
