import React from 'react';
import styles from './FloatingWhatAppButton.module.css';

const FloatingWhatsAppButton = () => {
  const phoneNumber = '3415075439'; // Reemplaza con tu número de teléfono
  const message = encodeURIComponent('¡Hola! Vengo de la pagina, deseo mas informacion.'); // Puedes personalizar el mensaje

  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={styles.floatingWhatsAppButton}>
      <img src="/whatsapp.svg" alt="WhatsApp" className={styles.botonWhatsapp} />
    </a>
  );
};

export default FloatingWhatsAppButton;
