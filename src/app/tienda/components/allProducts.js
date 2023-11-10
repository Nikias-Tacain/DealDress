'use client'
import Link from 'next/link';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { getAllProducts } from './productsQuery';
import { initializeApp } from 'firebase/app';
import styles from './CardTienda.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import CorreoHome from '@/app/components/CorreoHome';
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
    const [selectedCategory, setSelectedCategory] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const db= getFirestore();
        getAllProducts(db)
            .then((item) =>{
                setProducts(item)
                setLoading(false);
            })
    },[])
    const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoria.includes(selectedCategory))
    : products.filter((product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const renderProducts = () => (
        filteredProducts.map(item => (
          
            <section className={styles.cardProduct} key={item.id}>
                <div className={styles.divProductImg}>
                    <Link href={`/tienda/${item.id}`}>
                        <article className={styles.imgProduct}>
                            <img src={item.image} alt={item.nombre}/>
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
        ))
    )
    const [activeCategory, setActiveCategory] = useState(null);

    const toggleSubcategories = (category) => {
      setActiveCategory(category === activeCategory ? null : category);
    };
    return(
       <>   
            <div className={styles.categoriesButtonClick}>
              <div className={styles.categoriesButtonClickInput}>
                <label><FontAwesomeIcon icon={faMagnifyingGlass}/></label>
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
                <br></br>
                <div className={styles.categoriesPanel}>
                  <ul className={styles.categoryList}>
                    <div className={styles.divisor}>
                    <li className={styles.categorySection}>
                      <div className={styles.subcategories}>
                                    <div className={styles.subcategory}>
                                        <li onClick={() => setSelectedCategory('mujerUrbano')}>MUJER URBANO</li>
                                    </div>
                      </div>
                    </li>
                    <li className={styles.categorySection}>
                      <div className={styles.subcategories}>
                                    <div className={styles.subcategory}>
                                        <li onClick={() => setSelectedCategory('hombreUrbano')}>HOMBRE URBANO</li>
                                    </div>
                      </div>
                    </li>
                    </div>
                    <li className={styles.categorySection}>
                      <li onClick={() => toggleSubcategories('deportivo')} className={styles.categoryTitle}>DEPORTIVO  ↓</li>
                      <div className={styles.subcategoriesDeportivo}>
                        {activeCategory === 'deportivo' && (
                                    <div className={styles.subcategoryDeportivo}>
                                        <p>HOMBRE - DEPORTIVO</p>
                                        <li onClick={() => setSelectedCategory('shortDeportivoHombre')}>SHORT</li>
                                        <li onClick={() => setSelectedCategory('contactoDeporteHombre')}>DEPORTE DE CONTACTO</li>
                                        <li onClick={() => setSelectedCategory('fittnesDeportivoHombres')}>FITTNES</li>
                                        <li onClick={() => setSelectedCategory('remerasCamperasDeportivoHombre')}>REMERAS Y CAMPERAS</li>
                                        <li onClick={() => setSelectedCategory('pantalonesDeportivoHombre')}>PANTALONES</li>
                                        <p>MUJER - DEPORTIVO</p>
                                        <li onClick={() => setSelectedCategory('topDeportivoMujer')}>TOP</li>
                                        <li onClick={() => setSelectedCategory('calzasDeportivasMujer')}>CALZAS</li>
                                        <li onClick={() => setSelectedCategory('remerasDeportivasMujer')}>REMERAS</li>
                                        <li onClick={() => setSelectedCategory('buzosCamperasDeportivoMujer')}>BUZOS Y CAMPERAS</li>
                                    </div>
                        )}
                        </div>
                    </li>
                    <li className={styles.categorySection}>
                      <div className={styles.subcategories}>
                                    <div className={styles.subcategory}>
                                        <li onClick={() => setSelectedCategory('calzado')}>CALZADO</li>
                                    </div>
                      </div>
                    </li>
                    <div className={styles.divisor}>
                    <li className={styles.categorySection}>
                      <div className={styles.subcategories}>
                                    <div className={styles.subcategory}>
                                        <li onClick={() => setSelectedCategory('otros')}>OTROS</li>
                                    </div>
                      </div>
                    </li>
                    <li className={styles.categorySection}>
                      <div className={styles.subcategories}>
                                    <div className={styles.subcategory}>
                                        <article>
                                          <li onClick={() => setSelectedCategory('promosTienda')}>PROMOS</li>
                                        </article>
                                    </div>
                      </div>
                    </li>
                    </div>
                  </ul>
                </div>
              </div>
            <div className={styles.card}>
                {loading ? <h2>Cargando productos...</h2> : renderProducts()}
            </div>
        </>
    )
}

export default ProductList;