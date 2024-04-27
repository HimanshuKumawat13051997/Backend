import mongoose, { Schema } from "mongoose";

const seatSchema = new Schema({
  upperbirth: {
    type: [Object],
    required: true,
  },
  lowerbirth: {
    type: [Object],
    required: true,
  },
});

export const seatscollection = mongoose.model("seatscollection", seatSchema);
