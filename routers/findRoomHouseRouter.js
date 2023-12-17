import express from 'express';
import findRoomHouseController from '../controllers/findRoomHouseController.js';

const router = express.Router();

// Create a new findRoomHouse
router.post('/findRoomHouses', findRoomHouseController.createFindRoomHouse);

// Update an existing findRoomHouse by ID
router.put('/findRoomHouses/:id', findRoomHouseController.updateFindRoomHouse);

// Delete a findRoomHouse by ID
router.delete('/findRoomHouses/:id', findRoomHouseController.deleteFindRoomHouse);

// Get all findRoomHouses
router.get('/findRoomHouses', findRoomHouseController.getAllFindRoomHouses);

// Get findRoomHouses by user ID
router.get('/findRoomHouses/user/:userId', findRoomHouseController.getFindRoomHousesByUser);
router.get('/findRoomHouses/id/:id', findRoomHouseController.getFindRoomHousesByID);

// Update status of a findRoomHouse by ID
router.put('/findRoomHouses/status/:id', findRoomHouseController.updateFindRoomHouseStatusById);

// Add other routes as needed

export default router;
