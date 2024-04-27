import { asyncHandler } from "../utility/asyncHandler.js";
import { APIError } from "../utility/APIerror.js";
import { APIResponse } from "../utility/APIResponse.js";
import { booking } from "../models/booking.model.js";
import mongoose from "mongoose";

const { Types } = mongoose;

const bookingTickets = asyncHandler(async (req, res) => {
  const {
    userId,
    scheduleId,
    passenger_details,
    transactionId,
    status,
    price,
  } = req.body;

  if (!transactionId) {
    throw new APIError(401, "Transaction Failed");
  }

  const existedtranscationId = await booking.findOne({
    payment_id: transactionId,
  });

  console.log(existedtranscationId);
  console.log(typeof existedtranscationId);

  if (existedtranscationId) {
    return res
      .status(201)
      .json(new APIResponse(200, existedtranscationId, "Already Present"));
  }

  const theId = new Types.ObjectId(scheduleId);
  const user = new Types.ObjectId(userId);

  const totaldata = {
    user_id: user,
    schedule_id: theId,
    passenger_details: passenger_details,
    status: status,
    payment_id: transactionId,
    price: price,
  };

  await booking.create({
    user_id: user,
    schedule_id: theId,
    passenger_details: passenger_details,
    status: status,
    payment_id: transactionId,
    price: price,
  });

  return res
    .status(201)
    .json(new APIResponse(200, totaldata, "Booked Successful"));
});

const bookingSearch = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  if (!id) {
    throw new APIError(400, "No userId. Login Again");
  }

  const Id = new Types.ObjectId(id);

  const history = await booking.aggregate([
    {
      $match: {
        user_id: Id,
      },
    },
    {
      $lookup: {
        from: "schedules",
        localField: "schedule_id",
        foreignField: "_id",
        as: "Bus_Details",
      },
    },
    {
      $unwind: {
        path: "$Bus_Details",
      },
    },
    {
      $sort: {
        createdAt: 1,
      },
    },
  ]);

  return res.status(200).json(new APIResponse(200, history, "found"));
});

export { bookingTickets, bookingSearch };
