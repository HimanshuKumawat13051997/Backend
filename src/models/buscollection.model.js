import mongoose, { Schema } from "mongoose";

const busSchema = new Schema({
  bus_name: { type: String, required: true },
  totalseats: { type: Number, required: true },
  seatavailable: { type: Number, required: true },
  bus_type: { type: String, required: true },
  seats: {
    type: Schema.Types.ObjectId,
    ref: "seatscollection",
  },
  ratings: {
    type: Number,
  },
  boarding: { type: String, required: true },
  dropping: { type: String, required: true },
  bus_number: {
    type: String,
    required: true,
  },
  routeId: {
    type: Schema.Types.ObjectId,
    ref: "routes",
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  depertureTime: {
    type: String,
    required: true,
  },
});

export const buscollection = mongoose.model("buscollection", busSchema);
