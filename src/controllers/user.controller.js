import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uplaodOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
    // res.status(200).json({
    //     message: "ok"
    // })




    //get user details from frontend
    //validation- not empty
    //check if user already exists
    //check for images, and avatar
    //upload them to cloudinary
    //create user object
    //remove pasword and refresh token fieldfrom response
    //check for user creation
    //return res

    const { fullname, email, username, password } = req.body
    // console.log("email: ", email);

    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "all fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "user with this email or username exists")
    }

    const avatarlocalpath = req.files?.avatar[0]?.path;

    const coverimagelocalpath = req.files?.coverimage[0]?.path;

    if (!avatarlocalpath) {
        throw new ApiError(400, "avatar file is required")
    }

    const avatar = await uplaodOnCloudinary(avatarlocalpath)

    const coverimage = await uplaodOnCloudinary(coverimagelocalpath)

    if (!avatar) {
        throw new ApiError(400, "avatar file is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverimage: coverimage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createduser = await User.findById(user._id).select("-password -refreshToken")

    if (!createduser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }


    return res.status(201).json(
        new ApiResponse(200, createduser, "user registerd successfully")
    )
})

export {
    registerUser,
}