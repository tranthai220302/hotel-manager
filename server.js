import express from "express";
import db from "./Models/Entitys/index.js";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'
import routerUser from "./Routes/UserRoute.js";
import routerAuth from "./Routes/AuthRoute.js";
import routerReview from "./Routes/ReviewRoute.js";
import routerCategory from "./Routes/CategoryRoute.js";
import routerHotel from "./Routes/HotelRoute.js";
import routerRoom from "./Routes/RoomRoute.js";
import routerBooking from "./Routes/BookingRoute.js";
import routerAddress from "./Routes/AddressRoute.js";
import routerQuestion from "./Routes/QuestionRoute.js";
import routerCategoryItem from "./Routes/CategoryItemRoute.js";
import routerOwnerHotel from "./Routes/OwnerHotelRoute.js";
import { Server } from "socket.io";
import routerFeedBack from "./Routes/FeedBackRoute.js";
import path from "path";
import cron from 'node-cron'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getAddress } from "./Models/Services/AddressService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config()
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: ['http://localhost:3000', 'https://harubooking.onrender.com'],
  credentials: true
}));
const port = process.env.PORT
//Connect database
try {
    await db.sequelize.authenticate();
    console.log('Connection database successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

await db.sequelize.sync({
    alter: true,
    logging : ()=>{}
}).then(()=>{
    console.log('Update database success')
})
await getAddress()
//api
app.use('/api/auth', routerAuth)
app.use('/api/user', routerUser)
app.use('/api/review', routerReview)
app.use('/api/category', routerCategory)
app.use('/api/feedBack', routerFeedBack)
app.use('/api/hotel', routerHotel)
app.use('/api/room', routerRoom);
app.use('/api/booking', routerBooking)
app.use('/api/address', routerAddress)
app.use('/api/question', routerQuestion)
app.use('/api/categoryItem', routerCategoryItem)
app.use('/api/owner', routerOwnerHotel)
app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  console.log(err)
  return res.status(500).send(errorMessage);
})
const server = app.listen(port, ()=>{
  console.log(`Server is listening ${port}`)
})
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(onlineUsers)
  });

  socket.on("send-mes", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      console.log(sendUserSocket)
      socket.to(sendUserSocket).emit("mes-receive", data);
    }
  });
});
