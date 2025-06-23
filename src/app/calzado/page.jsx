'use client';
import React, { useState, useEffect, useMemo } from 'react';
import CarrouselImgs from '../tienda/components/CarrouselImgs';
import CorreoHome from '../components/CorreoHome';
import FloatingWhatsAppButton from '../tienda/components/FloatingWhatsAppButton';
import styles from './components/calzado.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { db } from '@/app/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import ProductList from './components/ProductList'; // nuevo componente separado

export default function Page() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const productosRef = collection(db, 'products');
        const resp = await getDocs(productosRef);
        const data = resp.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setProducts(data);
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    };
    obtenerProductos();
  }, []);

  return (
    <main>
      <CarrouselImgs />

      <div className={styles.categoriesButtonClickInput}>
        <label htmlFor="search-input">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </label>
        <input
          id="search-input"
          type="text"
          placeholder="Buscar productos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
          aria-label="Buscar productos"
        />
      </div>

      <CorreoHome />

      <ProductList
        products={products}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory || 'calzado'}
      />

      <FloatingWhatsAppButton />
    </main>
  );
}
