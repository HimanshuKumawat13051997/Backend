import { Router } from "express";
import { addBus } from "../controllers/buscollection.controllers.js";

const busrouter = Router();

busrouter.route("/add-bus").post(addBus);

export default busrouter;
