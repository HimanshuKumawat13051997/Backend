import { Router } from "express";
import { seatsAdd, updateseat } from "../controllers/seat.controllers.js";

const seatrouter = Router();

seatrouter.route("/seat-add").post(seatsAdd);

seatrouter.route("/update-seat").patch(updateseat);

export default seatrouter;
