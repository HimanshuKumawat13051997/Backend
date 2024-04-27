// import { idextraction, payment } from "../controllers/payment.controller.js";
import { payment } from "../controllers/payment.controller.js";

import { Router } from "express";

const paymentRouter = Router();

paymentRouter.route("/payment").post(payment);

// paymentRouter.route("/redirect-url/:merchantTransactionId").get(idextraction);

export default paymentRouter;
