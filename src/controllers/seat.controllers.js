import { asyncHandler } from "../utility/asyncHandler.js";
import { APIResponse } from "../utility/APIResponse.js";
import { seatscollection } from "../models/seats.model.js";
import { schedules } from "../models/schedule.model.js";
import { APIError } from "../utility/APIerror.js";
import mongoose from "mongoose";
const { Types } = mongoose;

const seatsAdd = asyncHandler(async (req, res) => {
  const { upperbirth, lowerbirth } = req.body;

  await seatscollection.create({
    upperbirth,
    lowerbirth,
  });

  return res
    .status(200)
    .json(new APIResponse(200, {}, "Seats Added Successfully"));
});

const updateseat = asyncHandler(async (req, res) => {
  const { seat, scheduleId } = req.body;

  const theId = new Types.ObjectId(scheduleId);

  try {
    const foundschedule = await schedules.aggregate([
      {
        $match: {
          _id: theId,
        },
      },
    ]);

    if (!foundschedule) {
      throw new APIError(404, "Schedule not present");
    }

    let updateseated = foundschedule[0].trip.seatavailable;

    const newseatingStucture = foundschedule[0].trip.seatingStructure;

    for (const item of newseatingStucture.upperbirth) {
      if (item.dualseats) {
        let row = item.dualseats;
        for (const i of row) {
          if (i.seatnumber == seat) {
            i.isSelected = true;
            break;
          }
        }
      }
      if (item.singleseats) {
        let rowSingle = item.singleseats;
        for (const i of rowSingle) {
          if (i.seatnumber == seat) {
            i.isSelected = true;
            break;
          }
        }
      }
    }

    for (const item of newseatingStucture.lowerbirth) {
      if (item.dualseats) {
        let row = item.dualseats;
        for (const i of row) {
          if (i.seatnumber == seat) {
            i.isSelected = true;
            break;
          }
        }
      }
      if (item.singleseats) {
        let rowSingle = item.singleseats;
        for (const i of rowSingle) {
          if (i.seatnumber == seat) {
            i.isSelected = true;
            break;
          }
        }
      }
    }

    updateseated--;

    foundschedule[0].trip.seatingStructure.upperbirth =
      newseatingStucture.upperbirth;
    foundschedule[0].trip.seatingStructure.lowerbirth =
      newseatingStucture.lowerbirth;

    foundschedule[0].trip.seatavailable = updateseated;

    const filter = {
      _id: theId,
    };

    const update = {
      trip: foundschedule[0].trip,
    };

    let d = await schedules.findOneAndUpdate(filter, update);

    return res.status(200).json(new APIResponse(200, d, "Seat Number Updated"));
  } catch (error) {
    throw new APIError(400, `Error: ${error}`);
  }
});
export { seatsAdd, updateseat };
