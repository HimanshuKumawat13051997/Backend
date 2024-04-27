import { Router } from "express";
import { getBusDetailsbyRoute } from "../controllers/searchroute.controllers.js";
import { schdulechecker } from "../middleware/schchec.middleware.js";

const searchrouter = Router();

searchrouter.route("/search-route").post(getBusDetailsbyRoute);

export default searchrouter;
