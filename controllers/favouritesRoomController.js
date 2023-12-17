import favouritesRoomRepository from '../repositories/favouritesRoomRepository.js';
import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';



  const getUserFavorites = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const userFavorites = await favouritesRoomRepository.getUserFavorites(userId);
      res.status(HttpStatusCode.OK).json(userFavorites);
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: error.toString(),
      });
    }
  };
  
  const addRoomToUserFavorites = async (req, res) => {
    const { userId, roomId } = req.params;
  console.log(userId, roomId);
    try {
      const updatedFavoritesRoom = await favouritesRoomRepository.addRoomToUserFavorites(userId, roomId);
      res.status(HttpStatusCode.OK).json({
        message: 'Room added to user favorites successfully',
        data: updatedFavoritesRoom,
      });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: error.toString(),
      });
    }
  };
  
  const removeRoomFromUserFavorites = async (req, res) => {
    const { userId, roomId } = req.params;
  
    try {
      const updatedFavoritesRoom = await favouritesRoomRepository.removeRoomFromUserFavorites(userId, roomId);
      res.status(HttpStatusCode.OK).json({
        message: 'Room removed from user favorites successfully',
        data: updatedFavoritesRoom,
      });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: error.toString(),
      });
    }
  };

export default{

    getUserFavorites,
    removeRoomFromUserFavorites,
    addRoomToUserFavorites,
}