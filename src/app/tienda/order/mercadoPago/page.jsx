'use client';
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
  });

  // Inicializar MercadoPago
  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
      locale: 'es-AR',
    });
  }, []);

  // Crear preferencia después de completar el formulario
  useEffect(() => {
    if (carrito.length === 0 || !formCompleto) return;

    const crearPreferencia = async () => {
      try {
        const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
        const totalPrecio = carrito.reduce((acum, prod) => acum + prod.precio * prod.cantidad, 0);
        const totalConDescuento = descuentoAplicado ? totalPrecio * 0.9 : totalPrecio;

        const items = carrito.map(prod => ({
          title: prod.nombre,
          quantity: prod.cantidad,
          unit_price: Number(prod.precio.toFixed(2))
        }));

        const res = await axios.post(`${backendURL}/create_preference`, { items });

        setPreferenceId(res.data.id);
        console.log("✅ Preferencia creada:", res.data.id);
      } catch (err) {
        console.error("❌ Error creando preferencia:", err);
      }
    };

    crearPreferencia();
  }, [formCompleto, carrito, descuentoAplicado]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, correo, direccion } = formData;
    if (nombre && correo && direccion) {
      localStorage.setItem('formData', JSON.stringify(formData));
      setFormCompleto(true);
    } else {
      alert('Por favor completá todos los campos.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Pasarela de Pago</h2>

      {!formCompleto ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            onChange={handleChange}
            value={formData.nombre}
            required
          />
          <input
            type="email"
            name="correo"
            placeholder="Tu correo"
            onChange={handleChange}
            value={formData.correo}
            required
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección de entrega"
            onChange={handleChange}
            value={formData.direccion}
            required
          />
          <button type="submit">Continuar al pago</button>
        </form>
      ) : preferenceId ? (
        <Wallet initialization={{ preferenceId }} />
      ) : (
        <p>Generando preferencia de pago...</p>
      )}
    </div>
  );
}
