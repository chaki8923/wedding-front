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
          },
          unit_amount: req.body.price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    customer: customer.id,
    success_url: "https://localhost:3443",
    cancel_url: "https://localhost:3443",
  });
  return res.status(200).json({
    checkout_url: session.url,
  });
}
