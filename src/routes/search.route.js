import { Router } from "express";
import { getBusDetailsbyRoute } from "../controllers/searchroute.controllers.js";

const searchrouter = Router();

searchrouter.route("/search-route").post(getBusDetailsbyRoute);

export default searchrouter;
