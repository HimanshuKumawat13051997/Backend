import { asyncHandler } from "../utility/asyncHandler.js";

import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRETKEY);

const payment = asyncHandler(async (req, res) => {
  const { products } = req.body;
  const qua = 1;

  const lineitems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.seat,
      },
      unit_amount: product.mainprice * 100,
    },
    quantity: qua,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineitems,
    mode: "payment",
    success_url: `https://busbooking-delta.vercel.app/booked`,
    cancel_url: "https://busbooking-delta.vercel.app/unbooked",
  });

  return res.json({ id: session.id, url: session.url });
});

export { payment };
