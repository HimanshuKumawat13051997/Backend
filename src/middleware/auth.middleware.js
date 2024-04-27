import { User } from "../models/user.model.js";
import { APIError } from "../utility/APIError.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new APIError(401, "Unauthorised Request");
    }

    const decodedTokenInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedTokenInfo?._id).select(
      "-password, -refreshToken"
    );

    if (!user) {
      throw new APIError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new APIError(401, error?.message || "Invalid Access Token");
  }
});
