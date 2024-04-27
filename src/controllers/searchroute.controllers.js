import { asyncHandler } from "../utility/asyncHandler.js";
import { APIError } from "../utility/APIerror.js";
import { APIResponse } from "../utility/APIResponse.js";
import { buscollection } from "../models/buscollection.model.js";
import { schedules } from "../models/schedule.model.js";
import { routes } from "../models/routes.model.js";

const getBusDetailsbyRoute = asyncHandler(async (req, res) => {
  const { from, to, date } = req.body;

  const routeId = await routes
    .findOne({
      from: from,
      to: to,
    })
    .select("-from -to -__v");

  if (!routeId) {
    throw new APIError(400, "No Route Present");
  }

  const checker = await schedules.find({
    "trip.routeId": routeId._id,
    "trip.scheduleDate": date,
  });

  if (checker.length > 0) {
    return res
      .status(200)
      .json(new APIResponse(200, checker, "Schedule Found"));
  } else {
    const properschedule = await buscollection.aggregate([
      {
        $match: {
          routeId: routeId._id,
        },
      },
      {
        $lookup: {
          from: "seatscollections",
          localField: "seats",
          foreignField: "_id",
          as: "seatingStructure",
          pipeline: [
            {
              $project: {
                __v: 0,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$seatingStructure",
        },
      },
      {
        $addFields: {
          scheduleDate: date,
        },
      },
      {
        $project: {
          seats: 0,
          __v: 0,
        },
      },
    ]);

    for (let p of properschedule) {
      await schedules.create({
        trip: p,
      });
    }

    const details = await schedules.find({
      "trip.routeId": routeId._id,
    });

    return res
      .status(200)
      .json(new APIResponse(200, details, "Schedule Created"));
  }
});

export { getBusDetailsbyRoute };
