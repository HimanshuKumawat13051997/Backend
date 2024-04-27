import mongoose, { Schema } from "mongoose";

const routeSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
});

export const routes = mongoose.model("routes", routeSchema);
