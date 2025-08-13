import { NextResponse } from 'next/server';
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN // tu token privado
});

export async function POST(req) {
  try {
    const body = await req.json();

    const preference = {
      items: body.items,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL}/tienda/order/success`,
        failure: `${process.env.NEXT_PUBLIC_URL}/tienda/order/failure`,
        pending: `${process.env.NEXT_PUBLIC_URL}/tienda/order/pending`
      },
      auto_return: 'approved'
    };

    const result = await mercadopago.preferences.create(preference);
    return NextResponse.json({ id: result.body.id });
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    return NextResponse.json({ error: 'Error al crear preferencia' }, { status: 500 });
  }
}
