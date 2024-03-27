import { v2 as cloudinary } from "cloudinary";
import fs from "fs"



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uplaodOnCloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        })
        //file has been uploaded succesfully
        console.log("file has been uploaded.", response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localfilepath)
        //remove the localy saved temporary filr as the upload operation get failed
        return null;
    }
}

export { uplaodOnCloudinary }