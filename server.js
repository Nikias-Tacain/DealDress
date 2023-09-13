const express = require ("express");
const app = express();
const cors = require('cors');
const  mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors());

mercadopago.configure({
    access_token: "TEST-7071630621697018-091109-0ce86ef2784016b19a2602bb6664c4a6-1023748964",
});

app.get("/", function(req,res){
    res.send("El server funciona")
})

app.post("/create_preference", (req, res) =>{
    const preference = {
        items: [
          {
            title: req.body.description,
            quantity: Number(req.body.quantity),
            unit_price: Number(req.body.price),
          },
        ],
        back_urls: {
          success: 'https://localhost:3000',
          failure: 'https://localhost:3000',
          pending: 'https://localhost:3000',
        },
        auto_return: 'approved', // Configura uno de los valores permitidos
      };
      
      mercadopago.preferences.create(preference)
        .then((response) => {
          res.json({
            id: response.body.id,
          })
        })
        .catch((error) => {
          console.log(error);
        });
});

app.listen(8080, () =>{
    console.log('Server abierto en puerto 8080');
})