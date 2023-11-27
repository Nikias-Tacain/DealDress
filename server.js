const express = require ("express");
const app = express();
const cors = require('cors');
const  mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors());

mercadopago.configure({
  access_token: "APP_USR-323570557996031-090122-3d94e4d263a268087d96b5fb6e787341-564639309",
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
          success: 'https://dealdress.vercel.app/',
          failure: 'https://dealdress.vercel.app/tienda',
          pending: 'https://dealdress.vercel.app/tienda',
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