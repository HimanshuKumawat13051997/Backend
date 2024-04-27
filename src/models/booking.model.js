import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    schedule_id: {
      type: Schema.Types.ObjectId,
      ref: "schedules",
    },
    passenger_details: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    payment_id: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const booking = mongoose.model("booking", bookingSchema);
