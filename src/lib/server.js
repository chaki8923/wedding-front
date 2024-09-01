import Stripe from 'stripe'
console.log("key-----------------",);

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16"
})