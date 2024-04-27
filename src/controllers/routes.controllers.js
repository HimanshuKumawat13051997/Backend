import { asyncHandler } from "../utility/asyncHandler.js";
import { APIResponse } from "../utility/APIResponse.js";
import { routes } from "../models/routes.model.js";
import { APIError } from "../utility/APIerror.js";

const addroutes = asyncHandler(async (req, res) => {
  const { from, to } = req.body;

  const existedroute = await routes.findOne({
    from,
    to,
  });

  if (existedroute) {
    throw new APIError(400, "Route is present");
  }

  const route = {
    from,
    to,
  };

  await routes.create(route);

  return res
    .status(200)
    .json(new APIResponse(200, route, "Route Created Successfully"));
});

export { addroutes };
