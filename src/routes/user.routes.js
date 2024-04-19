import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, getUserChannelProfile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountdetails } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxcount: 1
        },
        {
            name: "coverImage",
            maxcount: 1
        }
    ]),
    registerUser
)


router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountdetails)


//WE HAVE TO LOOK UPON THIS AFTER SOME TIME
// router.route("/avatar").patch(verifyJWT, upload.single("avatar"),)
//here the avatar controller function is not accessing this


//same as above error we'll solve this
// router.route("cover-image").patch(verifyJWT, upload.single("coverimage"), updateuser)


//whenever we get data from URL which means we request it by using params method then we nedd to do write thios type of route
router.route("/c/:username").get(verifyJWT, getUserChannelProfile)


router.route("/history").get(verifyJWT, getWatchHistory)

export default router