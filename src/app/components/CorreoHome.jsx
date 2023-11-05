'use client'
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import React, { useState} from 'react';
import { initializeApp } from 'firebase/app';
import styles from './Correo.module.css';
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
const CorreoHome = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDRZu2-vVF7E_5jAjTS8la9tqlapofky-4",
    authDomain: "dealdress-90f47.firebaseapp.com",
    projectId: "dealdress-90f47",
    storageBucket: "dealdress-90f47.appspot.com",
    messagingSenderId: "377143023164",
    appId: "1:377143023164:web:7647ff34278d9248ce1539"
  };
  initializeApp(firebaseConfig);
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSaveEmail = async () => {
    if (email.trim() === '' || !email.includes('@')) {
      alert('Por favor, ingresa un correo electrónico válido.');
        return;
      }
      const db = getFirestore();
      try {
        const docRef = await addDoc(collection(db, 'correos'), {
          correo: email,
        });
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Correo registrado.'
        })
        setEmail('');
      } catch (error) {
        console.error('Error al guardar el correo electrónico:', error);
      }
  };
  return(
    <section className={styles.correoSection}>
      <h2>ENTERATE PRIMERO DE NUESTRAS PROMOCIONES</h2>
      <article>
        <label htmlFor="">Suscribete a nuestro newsletter</label>
        <div>
          <input type="email" value={email} onChange={handleEmailChange} className={styles.subscribeInput} name="" id="" placeholder='nombre@ejemplo.com'/>
          <button className={styles.subscribeButton} onClick={handleSaveEmail}>Suscribete <FontAwesomeIcon icon={faBell}/></button>
        </div>
      </article>
    </section>
  )
}
export default CorreoHome;