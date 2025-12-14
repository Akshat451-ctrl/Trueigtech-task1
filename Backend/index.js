import express from 'express';
import cors from 'cors';
import router from './routes/Route.js';
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use("/uploads", express.static("uploads"));

// app.use('/', (req,res)=>{
//     res.send("API is working")
// });
app.use('/member', router);
const test = await db.query("SELECT 1");
console.log("DB Connected!");

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
