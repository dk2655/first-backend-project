// require('dotenv').config({ path: './.env' })

// import mongoose from "mongoose";
// import express from "express";


// const app = express();

// const mongoURi = process.env.MONGODB_URI || "mongodb+srv://divyanshu58:divyanshu2655@cluster0.sn5od0z.mongodb.net/";

// (async () => {
//     try {

//         await mongoose.connect(mongoURi, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,

//         }
//         )
//         console.log("mongo connected successsfully");
        
//             app.listen(process.env.PORT, () => {
//                 console.log(`server is running at port : ${process.env.PORT}`);
//             })
//         } catch (error) {
//             console.log("ERROR: ", error);
//             throw error;
//         }
//     })();

        

import dotenv from "dotenv";
import connectDB from "./db/indexdb.js"
import { DB_NAME } from "./constants.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env'
});


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // await mongoose.connect(mongoURi, `${process.env.MONGODB_URI}/${DB_NAME}`)
        // app.on("error", (error) => {
        //     console.log("ERROR: ", error);
        //     throw error
        // })
        // app.listen(process.env.PORT, () => {
        //     console.log(`app is lstening on port ${process.env.PORT} mongo db connected successfully`);
        // })

  


//    DB from "./db/indexdb.js";


// connectDB()