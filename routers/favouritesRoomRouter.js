import express from 'express';
import favouritesRoomController from '../controllers/favouritesRoomController.js';
import { body, validationResult, param  } from 'express-validator';


const router = express.Router();


// Route: Create a new FavoritesRoom
router.post('/', [
    body('user').notEmpty().withMessage('User ID is required'),
    body('room').isArray({ min: 1 }).withMessage('At least one room ID is required'),
    // Add additional validation if needed
  ], favouritesRoomController.createFavoritesRoom);
  
  // Route: Update FavoritesRoom by ID
  router.put('/:id', [
    param('id').isMongoId().withMessage('Invalid FavoritesRoom ID'),
    body('user').optional().notEmpty().withMessage('User ID is required'),
    body('room').optional().isArray({ min: 1 }).withMessage('At least one room ID is required'),
    // Add additional validation if needed
  ], favouritesRoomController.updateFavoritesRoom);
  
  // Route: Delete FavoritesRoom by ID
  router.delete('/:id', [
    param('id').isMongoId().withMessage('Invalid FavoritesRoom ID'),
  ], favouritesRoomController.deleteFavoritesRoom);
  
  // Route: Get user favorites by UserID
  router.get('/user/:userId', [
    param('userId').isMongoId().withMessage('Invalid User ID'),
  ], favouritesRoomController.getUserFavorites);
  
  // Route: Add room to user favorites by UserID and RoomID
  router.put('/user/:userId/add-room/:roomId', [
    param('userId').isMongoId().withMessage('Invalid User ID'),
    param('roomId').isMongoId().withMessage('Invalid Room ID'),
  ], favouritesRoomController.addRoomToUserFavorites);
  
  // Route: Remove room from user favorites by UserID and RoomID
  router.put('/user/:userId/remove-room/:roomId', [
    param('userId').isMongoId().withMessage('Invalid User ID'),
    param('roomId').isMongoId().withMessage('Invalid Room ID'),
  ], favouritesRoomController.removeRoomFromUserFavorites);
  
  export default router;