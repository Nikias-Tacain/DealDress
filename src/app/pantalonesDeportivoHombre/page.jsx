'use client'
import React,{useState, useEffect} from 'react'
import CarrouselImgs from '../tienda/components/CarrouselImgs'
import CorreoHome from '../components/CorreoHome'
import FloatingWhatsAppButton from '../tienda/components/FloatingWhatsAppButton'
import styles from './components/pantalonesDeportivosHombre.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { db } from '@/app/firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link'

const Page = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
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
  return (
    <main>
        <CarrouselImgs/>
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
        <div className={styles.card}>
  {filteredProducts
    .filter((item) => item.categoria === 'pantalonesDeportivoHombre')
    .map((item) => (
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
    ))}
</div>
        <FloatingWhatsAppButton/>
    </main>
  )
}

export default Page;