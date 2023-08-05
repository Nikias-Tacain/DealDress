import React, { useState } from 'react';
import styles from './CategoriesButton.module.css';

const CategoriesButton = () => {
  const [isPanelVisible, setPanelVisible] = useState(false);

  const togglePanel = () => {
    setPanelVisible(!isPanelVisible);
  };

  return (
    <div>
      <button className={styles.categoriesButton} onClick={togglePanel}>
        Categorías ↓
      </button>
      {isPanelVisible && (
        <div className={styles.categoriesPanel}>
          <ul className={styles.categoryList}>
            <p>Mujeres</p>
            <br />
            <div>
                <big>Urbano</big>
                <li><a href="#">Jeans</a></li>
                <li><a href="#">Remeras</a></li>
                <li><a href="#">Buzos</a></li>
            </div>
            <div>
                <big>Deportivo</big>
                <li><a href="#">Jeans</a></li>
                <li><a href="#">Remeras</a></li>
                <li><a href="#">Buzos</a></li>
            </div>
            <br />
            <br />
            <p>Hombre</p>
            <br />
            <div>
                <big>Urbano</big>
                <li><a href="#">Jeans</a></li>
                <li><a href="#">Remeras</a></li>
                <li><a href="#">Buzos</a></li>
            </div>
            <div>
                <big>Deportivo</big>
                <li><a href="#">Jeans</a></li>
                <li><a href="#">Remeras</a></li>
                <li><a href="#">Buzos</a></li>
            </div>

          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoriesButton;
