import mongoose from "mongoose";
import { mongoDbUrl } from "./const.js";

export default function () {
    mongoose.set("strictQuery", false);
    mongoose
        .connect(mongoDbUrl)
        .then(() => console.log("Application is connected to db."))
        .catch((err) => console.log(err));
}
