import { stripe } from "../../lib/server";

export default async function handler(req, res) {
  const customer = await stripe.customers.retrieve(req.body.customer_id);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "jpy",
          product_data: {
            name: "ご祝儀",
            images: ["https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgTAKt8Kl1wsLG0CE6IGt_7NyPAo9lGRRZ30Fs2B19SXwOe3M8-V4Ee28lnjMpEFx862I-F66cg0PctGKv_UjClkVi_-_kpMwmCFuUfw022TsH3_7TXFdjNab82tVyNkM85uJyCvVNkjwQE/s1600/wedding_syukufuku.png"],
            description: req.body.comment,
          },
          unit_amount: req.body.price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    customer: customer.id,
    success_url: `${process.env.NEXT_PUBLIC_FRONT_URL}/timeLine`,
    cancel_url: `${process.env.NEXT_PUBLIC_FRONT_URL}/timeLine`,
  });
  return res.status(200).json({
    checkout_url: session.url,
  });
}
