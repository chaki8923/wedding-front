import Stripe from 'stripe'
console.log("key!!!!-----------------", process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16"
})