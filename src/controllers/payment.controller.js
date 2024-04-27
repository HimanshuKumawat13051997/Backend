import axios from "axios";
import sha256 from "sha256";
import uniqid from "uniqid";
import { asyncHandler } from "../utility/asyncHandler.js";
import { APIResponse } from "../utility/APIResponse.js";
import { APIError } from "../utility/APIerror.js";
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
    success_url: `http://localhost:3000/booked`,
    cancel_url: "http://localhost:3000/unbooked",
  });

  return res.json({ id: session.id, url: session.url });
});

export { payment };
