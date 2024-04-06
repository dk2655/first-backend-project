import { asyncHandler } from "../utils/asynchandler.js";

const registerUser = asyncHandler(async (req, res) => {
    res.status(500).json({
        message: "ok"
    })
})

export { registerUser }