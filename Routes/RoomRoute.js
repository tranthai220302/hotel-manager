import express from 'express'
import { verifyjson } from '../middleware/jwt.js';
import { cancelRoom, createRoom, getRoomBook, getRoomByHotelOwner, getRoomEmpty } from '../Controllers/RoomController.js';
const routerRoom = express.Router()
routerRoom.post('/create/:id', verifyjson, createRoom);
routerRoom.get('/empty/:idHotel', getRoomEmpty)
routerRoom.get('/roomBook', verifyjson, getRoomBook)
routerRoom.get('/hotelOwner', verifyjson, getRoomByHotelOwner)
routerRoom.post('/cancel/booking/:idPrice', verifyjson, cancelRoom)
export default routerRoom;