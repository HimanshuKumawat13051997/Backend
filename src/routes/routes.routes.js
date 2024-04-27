import { Router } from "express";
import { addroutes } from "../controllers/routes.controllers.js";
const routerouter = Router();

routerouter.route("/add-route").post(addroutes);

export default routerouter;
