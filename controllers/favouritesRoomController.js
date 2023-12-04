import favouritesRoomRepository from '../repositories/favouritesRoomRepository.js';
import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';


const createFavoritesRoom = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        errors: errors.array(),
      });
    }
  
    const favoritesRoomData = req.body;
    try {
      const createdFavoritesRoom = await favouritesRoomRepository.create(favoritesRoomData);
      res.status(HttpStatusCode.INSERT_OK).json({
        message: 'FavoritesRoom created successfully',
        data: createdFavoritesRoom,
      });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: error.toString(),
      });
    }
  };
  
  const updateFavoritesRoom = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        errors: errors.array(),
      });
    }
  
    const { id } = req.params;
    const favoritesRoomData = req.body;
  
    try {
      const updatedFavoritesRoom = await favouritesRoomRepository.update(id, favoritesRoomData);
      res.status(HttpStatusCode.OK).json({
        message: 'FavoritesRoom updated successfully',
        data: updatedFavoritesRoom,
      });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: error.toString(),
      });
    }
  };
  
  const deleteFavoritesRoom = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedFavoritesRoom = await favouritesRoomRepository.delete(id);
      res.status(HttpStatusCode.OK).json({
        message: 'FavoritesRoom deleted successfully',
        data: deletedFavoritesRoom,
      });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: error.toString(),
      });
    }
  };
  

  const getUserFavorites = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const userFavorites = await favouritesRoomRepository.getUserFavorites(userId);
      res.status(HttpStatusCode.OK).json({
        message: 'User favorites retrieved successfully',
        data: userFavorites,
      });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: error.toString(),
      });
    }
  };
  
  const addRoomToUserFavorites = async (req, res) => {
    const { userId, roomId } = req.params;
  
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
    updateFavoritesRoom,
    deleteFavoritesRoom,
    getUserFavorites,
    removeRoomFromUserFavorites,
    addRoomToUserFavorites,
    createFavoritesRoom
}