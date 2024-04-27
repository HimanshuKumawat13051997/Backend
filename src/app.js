import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import router from "./routes/user.routes.js";

app.use("/users", router);

import seatrouter from "./routes/seat.routes.js";

app.use("/api/v1", seatrouter);

import busrouter from "./routes/buscollection.routese.js";

app.use("/api/v1", busrouter);

import routerouter from "./routes/routes.routes.js";

app.use("/api/v1", routerouter);

import searchrouter from "./routes/search.route.js";

app.use("/api/v1", searchrouter);

import paymentRouter from "./routes/payment.route.js";

app.use("/api/v1", paymentRouter);

import bookingRouter from "./routes/booking.route.js";

app.use("/api/v1", bookingRouter);
