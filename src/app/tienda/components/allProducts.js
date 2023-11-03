'use client'
import Link from 'next/link';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { getAllProducts } from './productsQuery';
import { initializeApp } from 'firebase/app';
import styles from './CardTienda.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faRotateRight } from '@fortawesome/free-solid-svg-icons';
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
    const [isPanelVisible, setPanelVisible] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [buttonText, setButtonText] = useState('MOSTRAR CATEGORIAS');
    const [activeCategory, setActiveCategory] = useState(null);

    const togglePanel = () => {
        setPanelVisible(!isPanelVisible);
        setShowPanel(!showPanel);
        setButtonText(showPanel ? 'MOSTRAR CATEGORIAS' : 'OCULTAR CATEGORIAS');
    };
    const toggleSubcategories = (category) => {
      setActiveCategory(category === activeCategory ? null : category);
    };
    const closePanel = () => {
      setPanelVisible(false);
      setShowPanel(false);
      setButtonText('MOSTRAR CATEGORIAS');
    };
    return(
       <>   
            <div className={styles.categoriesButtonClick}>
              <div className={styles.categoriesButtonClickInput}>
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
            
                <br></br>
                  <ul className={styles.categoryList}>
                    <li className={styles.categorySection}>
                      <div className={styles.subcategories}>
                                    <div className={styles.subcategory}>
                                        <li onClick={() => setSelectedCategory('mujerUrbano')}>MUJER - URBANO</li>
                                    </div>
                      </div>
                    </li>
                    <li className={styles.categorySection}>
                      <div className={styles.subcategories}>
                                    <div className={styles.subcategory}>
                                        <li onClick={() => setSelectedCategory('hombreUrbano')}>HOMBRE - URBANO</li>
                                    </div>
                      </div>
                    </li>
                    <li className={styles.categorySection}>
                      <li onClick={() => toggleSubcategories('deportivo')} className={styles.categoryTitle}>DEPORTIVO  ↓</li>
                      <div className={styles.subcategories}>
                        <div className={styles.subcategory}>
                        {activeCategory === 'deportivo' && (
                                    <div className={styles.subcategory}>
                                        <p>HOMBRE</p>
                                        <li onClick={() => setSelectedCategory('hombre')}>SHORT</li>
                                        <li onClick={() => setSelectedCategory('mujer')}>DEPORTE DE CONTACTO</li>
                                        <li onClick={() => setSelectedCategory('mujer')}>FITTNES</li>
                                        <li onClick={() => setSelectedCategory('mujer')}>REMERAS Y CAMPERAS</li>
                                        <li onClick={() => setSelectedCategory('mujer')}>PANTALONES</li>
                                        <p>MUJER</p>
                                        <li onClick={() => setSelectedCategory('hombre')}>TOP</li>
                                        <li onClick={() => setSelectedCategory('mujer')}>CALZAS</li>
                                        <li onClick={() => setSelectedCategory('mujer')}>REMERAS</li>
                                        <li onClick={() => setSelectedCategory('mujer')}>BUZOS Y CAMPERAS</li>
                                    </div>
                        )}
                        </div>
                      </div>
                    </li>
                    <li className={styles.categorySection}>
                      <div className={styles.subcategories}>
                                    <div className={styles.subcategory}>
                                        <li onClick={() => setSelectedCategory('hombreUrbano')}>CALZADO</li>
                                    </div>
                      </div>
                    </li>
                    <li className={styles.categorySection}>
                      <div className={styles.subcategories}>
                                    <div className={styles.subcategory}>
                                        <li onClick={() => setSelectedCategory('hombreUrbano')}>OTROS</li>
                                    </div>
                      </div>
                    </li>
                    <li className={styles.categorySection}>
                      <div className={styles.subcategories}>
                                    <div className={styles.subcategory}>
                                        <article>
                                          <li onClick={() => setSelectedCategory('botasUrbanasCaterpillar')}>OFERTAS</li>
                                        </article>
                                    </div>
                      </div>
                    </li>
                  </ul>
                </div>
            <div className={styles.card}>
                {loading ? <h2>Cargando productos...</h2> : renderProducts()}
            </div>
        </>
    )
}

export default ProductList;