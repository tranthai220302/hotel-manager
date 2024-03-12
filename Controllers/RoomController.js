import { createRoomServices, getRoomBookServices, getRoomEmptyService } from "../Models/Services/RoomService.js";
import createError from "../ultis/createError.js";

export const createRoom = async(req, res, next)=>{
    try {
        if(req.idRole !== 3 && req.idRole !== 2) return next(createError(400, 'Bạn không có quyền này!'));
        const data = req.body;
        const idHotel = req.params.id;
        const message = await createRoomServices(data, idHotel);
        if(message instanceof Error) return next(message);
        return res.status(200).send(message);
    } catch (error) {
        next(error);
    }
}
export const getRoomEmpty = async(req, res, next) =>{
    try {
        const room = await getRoomEmptyService(req.params.idHotel, req.query.dateCheckIn, req.query.dateCheckOut);
        if(room instanceof Error) return next(room);
        return res.status(200).send(room)
    } catch (error) {
        next(error)   
    }
}
export const getRoomBook = async(req, res, next) =>{
    try {
        const room = await getRoomBookServices(req.id);
        if(room instanceof Error) return next(room);
        return res.status(200).send(room)
    } catch (error) {
        next(error)
    }
}