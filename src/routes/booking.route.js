import {
  bookingTickets,
  bookingSearch,
} from "../controllers/booking.controller.js";

import { Router } from "express";

const bookingRouter = Router();

bookingRouter.route("/bookingcomp").post(bookingTickets);

bookingRouter.route("/:id").get(bookingSearch);

export default bookingRouter;
