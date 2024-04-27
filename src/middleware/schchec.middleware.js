import { schedules } from "../models/schedule.model.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import { routes } from "../models/routes.model.js";
import { APIResponse } from "../utility/APIResponse.js";
import { APIError } from "../utility/APIerror.js";

export const schdulechecker = asyncHandler(async (req, res, next) => {
  const { from, to, date } = req.body;

  let newdate = new Date(date);

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
  });
  console.log(checker);

  if (checker.length > 0) {
    return res
      .status(200)
      .json(new APIResponse(200, checker, "Schedule Found"));
  } else {
    req.newdate = newdate;
    req.routeId = routeId;
    next();
  }
});
