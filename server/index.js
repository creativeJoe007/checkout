import dotenv from "dotenv";
import {connectDB} from './db.js';
import app from "./app.js";

dotenv.config();

console.log("process.env.MONGO_URL", process.env.MONGO_URL)
// connect to DB
connectDB()

const port = process.env.PORT || 9000;
console.log(`PORT ${port}`)
app.listen(port, () => console.log("LISTENING ON PORT {port}"))
