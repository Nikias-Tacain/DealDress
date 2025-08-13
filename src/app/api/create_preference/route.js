import mercadopago from "mercadopago";

export async function POST(req) {
  try {
    // Leer el body que llega desde el frontend
    const body = await req.json();

    // Configurar Mercado Pago con tu Access Token
    mercadopago.configure({
      access_token: process.env.MP_ACCESS_TOKEN
    });

    // Crear la preferencia de pago
    const preference = {
      items: body.items, // Ej: [{ title: 'Producto', quantity: 1, unit_price: 100 }]
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/order/success`,
        failure: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/order/failure`,
        pending: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/order/pending`,
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);

    return new Response(
      JSON.stringify({ id: response.body.id }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Error en Mercado Pago:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
