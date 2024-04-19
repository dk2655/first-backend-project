import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)


        //here select method is used to remove the data that you does not want to send to the user.
        const user = await User.findById(decodedToken?._id).select("-password", "refreshToken")

        if (!user) {

            throw new ApiError(401, "invalid access token")
        }

        req.user = user;
        next() // it is used in routes to give instruction to the route that you have to run more than one methods 
    } catch (error) {
        throw new ApiError(401, error?.message || "invalid access token")
    }


})


