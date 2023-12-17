import express from 'express';
import favouritesRoomController from '../controllers/favouritesRoomController.js';
import { body, validationResult, param  } from 'express-validator';


const router = express.Router();


// Route: Create a new FavoritesRoo
  
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