import { asyncHandler } from "../utility/asyncHandler.js";
import { APIResponse } from "../utility/APIResponse.js";
import { buscollection } from "../models/buscollection.model.js";
import { APIError } from "../utility/APIerror.js";

const addBus = asyncHandler(async (req, res) => {
  const {
    bus_name,
    seatavailable,
    totalseats,
    bus_type,
    seats,
    ratings,
    boarding,
    dropping,
    bus_number,
    routeId,
    arrivalTime,
    depertureTime,
  } = req.body;

  const existedBus = await buscollection.findOne({
    bus_number: bus_number,
  });

  if (existedBus) {
    throw new APIError(400, "Bus is Already Present");
  }

  const bus = {
    bus_name,
    seatavailable,
    totalseats,
    seats,
    ratings,
    boarding,
    dropping,
    bus_number,
    routeId,
    bus_type,
    arrivalTime,
    depertureTime,
  };

  await buscollection.create(bus);

  return res
    .status(200)
    .json(new APIResponse(200, bus, "Bus data added Successfully"));
});

export { addBus };
