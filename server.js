require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mercadopago = require("mercadopago");

const app = express();
const PORT = process.env.PORT || 8080;


// === Middleware ===
app.use(express.json());

// ✅ CORS dinámico para desarrollo y producción
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
console.log("Usando FRONTEND_URL:", FRONTEND_URL);
app.use(cors({
  origin: [FRONTEND_URL, "https://dealdress.vercel.app"],
  methods: ["GET", "POST", "OPTIONS"], // 👈 Asegurate de incluir OPTIONS
  credentials: true
}));

// ✅ Configurar MercadoPago con variable de entorno
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

// === Ruta raíz de prueba ===
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente ✅");
});

// === Crear preferencia de pago ===
app.post("/create_preference", async (req, res) => {
  console.log("Body recibido:", req.body);

  const { items } = req.body;

  const preference = {
    items,
    back_urls: {
      success: `${process.env.FRONTEND_URL}/tienda/order/success`,
      failure: `${process.env.FRONTEND_URL}/tienda/order/failure`,
      pending: `${process.env.FRONTEND_URL}/tienda/order/pending`,
    },
    auto_return: 'approved',
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    console.log("✅ Preferencia creada:", response.body);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error("❌ Error al crear preferencia:", error);
    res.status(500).json({ error: error.message, details: error.response?.body || null });
  }
});


process.on('SIGTERM', () => {
  console.log('Recibí SIGTERM, cerrando servidor...');
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  console.error('Excepción no atrapada:', err);
});

// === Iniciar servidor ===
app.listen(PORT, () => {
  console.log(`🟢 Servidor corriendo en puerto ${PORT}`);
});
