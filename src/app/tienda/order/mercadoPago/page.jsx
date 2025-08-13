'use client'
import { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import { useCarrito } from "../../components/CarritoContext";
import { useDescuento } from "../../components/descuentoContext";
import styles from './pago.module.css';

export default function MercadoPagoPage() {
  const { carrito } = useCarrito();
  const { descuentoAplicado } = useDescuento();

  const [preferenceId, setPreferenceId] = useState(null);
  const [formCompleto, setFormCompleto] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    direccion: '',
    codigoPais: '54',
    codigoArea: '',
    telefono: '',
  });

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
      locale: 'es-AR',
    });
  }, []);

  useEffect(() => {
    if (carrito.length === 0 || !formCompleto) return;

    const crearPreferencia = async () => {
      try {
        const items = carrito.map(prod => ({
          title: prod.nombre,
          quantity: prod.cantidad,
          unit_price: Number(prod.precio.toFixed(2))
        }));

        const res = await axios.post('/api/create_preference', { items });

        setPreferenceId(res.data.id);
        console.log("✅ Preferencia creada:", res.data.id);
      } catch (err) {
        console.error("❌ Error creando preferencia:", err);
      }
    };

    crearPreferencia();
  }, [formCompleto, carrito, descuentoAplicado]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, correo, direccion, codigoPais, codigoArea, telefono } = formData;

    if (
      !nombre.trim() ||
      !correo.trim() ||
      !direccion.trim() ||
      !codigoArea.trim() ||
      !telefono.trim()
    ) {
      alert('Por favor completá todos los campos.');
      return;
    }

    if (!/^\d+$/.test(codigoArea) || !/^\d+$/.test(telefono)) {
      alert('Código de área y teléfono deben ser solo números.');
      return;
    }

    if (
      (codigoPais === '54' && (codigoArea.length < 2 || codigoArea.length > 4)) ||
      (codigoPais === '52' && (codigoArea.length < 2 || codigoArea.length > 3))
    ) {
      alert('Código de área inválido para el país seleccionado.');
      return;
    }

    localStorage.setItem('formData', JSON.stringify(formData));
    localStorage.setItem('carrito', JSON.stringify(carrito));
    setFormCompleto(true);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Pasarela de Pago</h2>

      {!formCompleto ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" name="nombre" placeholder="Tu nombre" onChange={handleChange} value={formData.nombre} required />
          <input type="email" name="correo" placeholder="Tu correo" onChange={handleChange} value={formData.correo} required />
          <input type="text" name="direccion" placeholder="Dirección de entrega" onChange={handleChange} value={formData.direccion} required />
          <select name="codigoPais" onChange={handleChange} value={formData.codigoPais} required>
            <option value="54">Argentina (+54)</option>
            <option value="52">México (+52)</option>
          </select>
          <input type="text" name="codigoArea" placeholder="Código de área" onChange={handleChange} value={formData.codigoArea} required maxLength={4} />
          <input type="text" name="telefono" placeholder="Número telefónico" onChange={handleChange} value={formData.telefono} required maxLength={15} />
          <button type="submit" className={styles.boton}>Continuar al pago</button>
        </form>
      ) : preferenceId ? (
        <Wallet initialization={{ preferenceId }} />
      ) : (
        <p>Generando preferencia de pago...</p>
      )}
    </div>
  );
}
