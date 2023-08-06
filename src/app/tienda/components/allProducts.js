'use client'
import Link from 'next/link';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { getAllProducts } from './productsQuery';
import { initializeApp } from 'firebase/app';
import styles from './CardTienda.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
const firebaseConfig = {
    apiKey: "AIzaSyDRZu2-vVF7E_5jAjTS8la9tqlapofky-4",
    authDomain: "dealdress-90f47.firebaseapp.com",
    projectId: "dealdress-90f47",
    storageBucket: "dealdress-90f47.appspot.com",
    messagingSenderId: "377143023164",
    appId: "1:377143023164:web:7647ff34278d9248ce1539"
};
initializeApp(firebaseConfig);
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const db= getFirestore();
        getAllProducts(db)
            .then((item) =>{
                setProducts(item)
            })
    },[])
    useEffect(() =>{
      setTimeout(() =>{
        setLoading(false);
      },1000)  
    })
    const [selectedCategory, setSelectedCategory] = useState(null);

  // Filtrar productos por categoría seleccionada
  const filteredProducts = selectedCategory
    ? products.filter(product => product.categoria === selectedCategory)
    : products;

    const renderProducts = () => (
        filteredProducts.map(item => (
           <section className={styles.cardProduct} key={item.id}>
               <article>
                   <div>
                       <img src={item.image}/>
                        <h2>{item.nombre}</h2>
                        <p>$ {item.precio}</p>
                    </div>
                    <div className={styles.cardProduct__link}>
                        <button>Agregar al carrito</button>
                       <Link href={`/tienda/${item.id}`}>👁Ver mas detalles</Link>
                   </div>
                </article>
            </section>
        ))
    )
    const [isPanelVisible, setPanelVisible] = useState(false);

    const togglePanel = () => {
        setPanelVisible(!isPanelVisible);
    };
    return(
       <>   
            <div className={styles.categoriesButtonClick}>
                <button className={styles.categoriesButton} onClick={togglePanel}>
                    Categorías ↓
                </button>
                {isPanelVisible && (
                <div className={styles.categoriesPanel}>
                    <ul className={styles.categoryList}>
                        <em>Mujer</em>
                        <br />
                        <div>
                    <big>Urbano</big>
                    <li onClick={() => setSelectedCategory('jeansMujerUrbano')}>Jeans</li>
                    <li onClick={() => setSelectedCategory('remerasMujerUrbano')}>Remeras</li>
                    <li onClick={() => setSelectedCategory('buzosMujerUrbano')}>Buzos</li>
                </div>
                <div>
                    <big>Deportivo</big>
                    <li onClick={() => setSelectedCategory('remerasMujerDeportivo')}>Remeras</li>
                    <li onClick={() => setSelectedCategory('calzasMujerDeportivo')}>Calzas</li>
                    <li onClick={() => setSelectedCategory('camperasMujerDeportivo')}>Camperas</li>
                </div>
                <br />
                <br />
                <em>Hombre</em>
                <br />
                <div>
                    <big>Urbano</big>
                    <li onClick={() => setSelectedCategory('jeansHombreUrbano')}>Jeans</li>
                    <li onClick={() => setSelectedCategory('remerasHombreUrbano')}>Remeras</li>
                    <li onClick={() => setSelectedCategory('buzosHombreUrbano')}>Buzos</li>
                </div>
                <div>
                    <big>Deportivo</big>
                    <li onClick={() => setSelectedCategory('remerasHombreDeportivo')}>Remeras</li>
                    <li onClick={() => setSelectedCategory('calzasHombreDeportivo')}>Calzas</li>
                    <li onClick={() => setSelectedCategory('camperasHombreDeportivo')}>Camperas</li>
                </div>
                <br/>
                <br/>
                <em>Calzado</em>
                <div>
                    <big>Urbano</big>
                </div>
                </ul>
            </div>
            )}
            <button onClick={() => setSelectedCategory(null)}><FontAwesomeIcon icon={faRotateRight} /></button>
            </div>
            <div className={styles.card}>
                {loading ? <h2>Cargando productos...</h2> : renderProducts()}
            </div>
        </>
    )
}

export default ProductList;