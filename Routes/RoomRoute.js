import express from 'express'
import { verifyjson } from '../middleware/jwt.js';
import { createRoom, getRoomBook, getRoomEmpty } from '../Controllers/RoomController.js';
const routerRoom = express.Router()
routerRoom.post('/create/:id', verifyjson, createRoom);
routerRoom.get('/empty/:idHotel', getRoomEmpty)
routerRoom.get('/roomBook', verifyjson, getRoomBook)
export default routerRoom;