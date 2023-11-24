'use client'
import React,{useState} from 'react'
import CarrouselImgs from '../tienda/components/CarrouselImgs'
import CorreoHome from '../components/CorreoHome'
import FloatingWhatsAppButton from '../tienda/components/FloatingWhatsAppButton'
import styles from './components/ofertas.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function page() {
    // const [searchTerm, setSearchTerm] = useState('');
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
            // value={searchTerm}
            style={{
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '10px',
              width: '300px',
            }}
            // onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <CorreoHome />
        <div>
            
        </div>
        <FloatingWhatsAppButton/>
    </main>
  )
}

export default page