'use client';
import React, { useState, useEffect, useMemo } from 'react';
import CarrouselImgs from '../tienda/components/CarrouselImgs';
import CorreoHome from '../components/CorreoHome';
import FloatingWhatsAppButton from '../tienda/components/FloatingWhatsAppButton';
import styles from './components/buzosCamperasMujer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { db } from '@/app/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from './components/ProductCard';

export default function Page() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const productosFiltrados = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return products.filter(product => {
      return (
        product.nombre.toLowerCase().includes(lowerSearch) &&
        product.categoria === 'buzosCamperasDeportivoMujer'
      );
    });
  }, [products, searchTerm]);

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

      <div className={styles.card}>
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(item => (
            <ProductCard key={item.id} item={item} />
          ))
        ) : (
          <p className={styles.noResults}>No se encontraron productos.</p>
        )}
      </div>

      <FloatingWhatsAppButton />
    </main>
  );
}
