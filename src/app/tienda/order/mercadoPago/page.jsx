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
    codigoPais: '54',  // por defecto Argentina
    codigoArea: '',
    telefono: '',
  });

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
      locale: 'es-AR',
    });
  }, []);

  // Crear preferencia (igual que antes)
  useEffect(() => {
    if (carrito.length === 0 || !formCompleto) return;

    const crearPreferencia = async () => {
      try {
        const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

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

  // Actualizar estado formData al cambiar inputs
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // Validar campos básicos + teléfono con códigos
  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, correo, direccion, codigoPais, codigoArea, telefono } = formData;

    // Validación simple para Argentina y México
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

    // Validar que codigoArea y telefono sean números y tengan tamaño razonable
    if (!/^\d+$/.test(codigoArea) || !/^\d+$/.test(telefono)) {
      alert('Código de área y teléfono deben ser solo números.');
      return;
    }

    if (
      (codigoPais === '54' && (codigoArea.length < 2 || codigoArea.length > 4)) || // Argentina
      (codigoPais === '52' && (codigoArea.length < 2 || codigoArea.length > 3))    // México
    ) {
      alert('Código de área inválido para el país seleccionado.');
      return;
    }

    // Si pasó todo, guardar y continuar
    localStorage.setItem('formData', JSON.stringify(formData));
    localStorage.setItem('carrito', JSON.stringify(carrito));
    setFormCompleto(true);
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

          {/* Select código país */}
          <select
            name="codigoPais"
            onChange={handleChange}
            value={formData.codigoPais}
            required
          >
            <option value="54">Argentina (+54)</option>
            <option value="52">México (+52)</option>
            {/* Podés agregar más países acá */}
          </select>

          <input
            type="text"
            name="codigoArea"
            placeholder="Código de área"
            onChange={handleChange}
            value={formData.codigoArea}
            required
            maxLength={4}
          />

          <input
            type="text"
            name="telefono"
            placeholder="Número telefónico"
            onChange={handleChange}
            value={formData.telefono}
            required
            maxLength={15}
          />

          <button type="submit" className={styles.boton}>
            Continuar al pago
          </button>
        </form>
      ) : preferenceId ? (
        <Wallet initialization={{ preferenceId }} />
      ) : (
        <p>Generando preferencia de pago...</p>
      )}
    </div>
  );
}
