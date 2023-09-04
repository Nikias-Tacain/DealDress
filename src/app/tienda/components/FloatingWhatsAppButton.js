import React from 'react';
import styles from './FloatingWhatAppButton.module.css';
import Image from 'next/image';
const FloatingWhatsAppButton = () => {
  const phoneNumber = '3415075439'; // Reemplaza con tu número de teléfono
  const message = encodeURIComponent('¡Hola! Vengo de la pagina, deseo mas informacion.'); // Puedes personalizar el mensaje

  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={styles.floatingWhatsAppButton}>
      <Image src="/whatsapp.svg" alt="WhatsApp" className={styles.botonWhatsapp} width={1000} height={300}/>
    </a>
  );
};

export default FloatingWhatsAppButton;
