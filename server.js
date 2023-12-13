const express = require("express");
const app = express();
const cors = require('cors');
const mercadopago = require("mercadopago");

const PORT = process.env.PORT || 8080;  // Utiliza el puerto proporcionado por Vercel o el puerto 8080 si no está disponible

app.use(express.json());
app.use(cors());

mercadopago.configure({
    access_token: "APP_USR-7076552330700962-120407-7469bb43b51508716a6d9f39200f8255-1466887909",
});

app.get("/", function (req, res) {
    res.send("El server funciona")
})

app.post("/create_preference", async (req, res) => {
    try {
      const preference = {
        items: [
            {
                title: req.body.description,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price),
            },
        ],
        back_urls: {
            success: 'http://localhost:3000/',
            failure: 'http://localhost:3000/tienda',
            pending: 'http://localhost:3000/tienda',
        },
        auto_return: 'approved', // Configura uno de los valores permitidos
      };
        const response = await mercadopago.preferences.create(preference);
        res.json({
            id: response.body.id,
        });
    } catch (error) {
        console.error("Error al crear preferencia de pago:", error);
        res.status(500).json({ error: "Error al procesar la solicitud" });
    }
});

app.listen(PORT, () => {
    console.log(`Server abierto en puerto ${PORT}`);
});







