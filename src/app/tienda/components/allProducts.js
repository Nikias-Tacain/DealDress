'use client'
import Link from 'next/link';
import { getFirestore } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { getAllProducts } from './productsQuery';
import { initializeApp } from 'firebase/app';
import styles from './CardTienda.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { useCarrito } from './CarritoContext';
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
    const { handleButtonClick } = useCarrito();
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
  const filteredProducts = selectedCategory
    ? products.filter(product => product.categoria === selectedCategory) : products;
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
                        <article>
                            <h2>{item.nombre}</h2>
                            <p>$ {item.precio}</p>
                        </article>
                    </div>
                    <div className={styles.cardProduct__link}>
                      <Link href={`/tienda/${item.id}`}>
                        <button><FontAwesomeIcon icon={faEye} /></button>
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
                <button className={styles.buttonCategories} onClick={togglePanel} type='button'>
                    {buttonText}
                </button>
                {isPanelVisible && (
                <div className={styles.categoriesPanel}>
                  <ul className={styles.categoryList}>
                    <button className={styles.closeButton} onClick={closePanel}>X</button>
                    <div style={{ margin: '5%'}}>
                      <Link href='tienda/guiaCompra'>
                        <button style={{ cursor: 'pointer', fontSize: '20px' }}>¿COMO COMPRAR?</button>
                      </Link>
                    </div>

                    <li className={styles.categorySection}>
                      <em
                                className={styles.categoryTitle}
                                onClick={() => toggleSubcategories('Mujer')}
                            >
                                MUJER
                      </em>
                      <div className={styles.subcategories}>
                      {activeCategory === 'Mujer' && (
                                    <div className={styles.subcategory}>
                                        <li onClick={() => setSelectedCategory('sweatersMujer')}>SWEATERS</li>
                                        <li onClick={() => setSelectedCategory('buzosMujer')}>BUZOS</li>
                                        <li onClick={() => setSelectedCategory('camperasMujer')}>CAMPERAS</li>
                                        <li onClick={() => setSelectedCategory('parkasMujer')}>PARKAS</li>
                                        <li onClick={() => setSelectedCategory('remerasLargasMujer')}>REMERAS MANGAS LARGAS</li>
                                        <li onClick={() => setSelectedCategory('jeansChupinMujer')}>JEANS CHUPIN</li>
                                        <li onClick={() => setSelectedCategory('jeansMomMujer')}>JEANS MOM</li>
                                    </div>
                                )}
                      </div>
                    </li>

                    <li className={styles.categorySection}>
                      <em
                                className={styles.categoryTitle}
                                onClick={() => toggleSubcategories('EntrenoEllas')}
                            >
                                PARA ENTRENAR ELLAS
                      </em>
                      <div className={styles.subcategories}>
                        <div className={styles.subcategory}>
                        {activeCategory === 'EntrenoEllas' && (
                                    <div className={styles.subcategory}>
                                        <li onClick={() => setSelectedCategory('topsDeportivosMujer')}>TOPS DEPORTIVOS</li>
                                        <li onClick={() => setSelectedCategory('bikersMujer')}>BIKERS</li>
                                        <li onClick={() => setSelectedCategory('calzasCortasMujer')}>CALZAS CORTAS</li>
                                        <li onClick={() => setSelectedCategory('capriMujer')}>CAPRI</li>
                                        <li onClick={() => setSelectedCategory('calzasLargasMujer')}>CALZAS LARGAS</li>
                                        <li onClick={() => setSelectedCategory('musculosasMujer')}>MUSCULOSAS</li>
                                        <li onClick={() => setSelectedCategory('lineaCrossfitMujer')}>LINEA CROSSFIT</li>
                                        <li onClick={() => setSelectedCategory('lineaEuforicaMujer')}>LINEA EUFORICA</li>
                                        <li onClick={() => setSelectedCategory('legginsMujer')}>LEGGINS</li>
                                        <li onClick={() => setSelectedCategory('shortsMujer')}>SHORTS</li>
                                    </div>
                        )}
                        </div>
                      </div>
                    </li>
                    <li className={styles.categorySection}>
                      <em
                                className={styles.categoryTitle}
                                onClick={() => toggleSubcategories('Complementos')}
                            >
                                COMPLEMENTOS
                      </em>
                      <div className={styles.subcategories}>
                      {activeCategory === 'Complementos' && (
                                    <div className={styles.subcategory}>
                                        <li onClick={() => setSelectedCategory('bolsosComplementos')}>BOLSOS</li>
                                        <li onClick={() => setSelectedCategory('guantesBoxeoComplementos')}>GUANTES DE BOXEO</li>
                                    </div>
                        )}
                      </div>
                    </li>
                    <li className={styles.categorySection}>
                      <em
                                className={styles.categoryTitle}
                                onClick={() => toggleSubcategories('Hombre')}
                            >
                                HOMBRE
                      </em>
                      <div className={styles.subcategories}>
                      {activeCategory === 'Hombre' && (
                                    <div className={styles.subcategory}>
                                        <li onClick={() => setSelectedCategory('buzosHombre')}>BUZOS</li>
                                        <li onClick={() => setSelectedCategory('camperasHombre')}>CAMPERAS</li>
                                        <li onClick={() => setSelectedCategory('sweatersHombre')}>SWEATERS</li>
                                        <li onClick={() => setSelectedCategory('remerasHombre')}>REMERAS</li>
                                        <li onClick={() => setSelectedCategory('camisasHombre')}>CAMISAS</li>
                                        <li onClick={() => setSelectedCategory('bermudasHombre')}>BERMUDAS</li>
                                        <li onClick={() => setSelectedCategory('bermudaBañoHombre')}>BERMUDA DE BAÑO</li>
                                        <li onClick={() => setSelectedCategory('jeansCargosHombre')}>JEANS CARGOS</li>
                                        <li onClick={() => setSelectedCategory('jeansChupinHombre')}>JEANS CHUPIN</li>
                                        <li onClick={() => setSelectedCategory('parkasHombre')}>PARKAS</li>
                                    </div>
                        )}
                      </div>
                    </li>
                    <li className={styles.categorySection}>
                      <em
                                className={styles.categoryTitle}
                                onClick={() => toggleSubcategories('EntrenoEllos')}
                            >
                                PARA ENTRENAR ELLOS
                      </em>
                      <div className={styles.subcategories}>
                        <div className={styles.subcategory}>
                        {activeCategory === 'EntrenoEllos' && (
                                    <div className={styles.subcategory}>
                                        <li onClick={() => setSelectedCategory('lineaVenumHombre')}>LINEA VENUM</li>
                                        <li onClick={() => setSelectedCategory('lineaEverlastHombre')}>LINEA EVERLAST</li>
                                        <li onClick={() => setSelectedCategory('lineaUfcHombre')}>LINEA UFC</li>
                                    </div>
                        )}
                        </div>
                      </div>
                    </li>
                    <li className={styles.categorySection}>
                      <em
                                className={styles.categoryTitle}
                                onClick={() => toggleSubcategories('Calzado')}
                            >
                                CALZADO
                      </em>
                      <div className={styles.subcategories}>
                      {activeCategory === 'Calzado' && (
                                    <div className={styles.subcategory}>
                                        <article>
                                          <big>URBANO</big>
                                          <li onClick={() => setSelectedCategory('botasUrbanasCaterpillar')}>CATERPILLAR</li>
                                          <li onClick={() => setSelectedCategory('botasUrbanasLaCoste')}>LA COSTE</li>
                                          <li onClick={() => setSelectedCategory('botasUrbanasNikeSB')}>NIKE SB</li>
                                        </article>
                                        <article>
                                          <big>DEPORTIVO</big>
                                          <li onClick={() => setSelectedCategory('botasDeportivasEverlast')}>BOTITAS EVERLAST</li>
                                          <li onClick={() => setSelectedCategory('botinesDeportivos')}>BOTINES</li>
                                          <li onClick={() => setSelectedCategory('botasDeportivasAsics')}>ASICS</li>
                                          <li onClick={() => setSelectedCategory('botasDeportivasNike')}>NIKE</li>
                                          <li onClick={() => setSelectedCategory('botasDeportivasAdidas')}>ADIDAS</li>
                                        </article>
                                    </div>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
                )}
                <button onClick={() => setSelectedCategory(null)} className={styles.refilCategories}><FontAwesomeIcon icon={faRotateRight} /></button>
            </div>
            <div className={styles.card}>
                {loading ? <h2>Cargando productos...</h2> : renderProducts()}
            </div>
        </>
    )
}

export default ProductList;