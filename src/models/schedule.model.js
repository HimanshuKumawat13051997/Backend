import mongoose, { Schema } from "mongoose";

const scheduleSchema = new Schema({
  trip: {
    type: Object,
  },
});

export const schedules = mongoose.model("schedules", scheduleSchema);
