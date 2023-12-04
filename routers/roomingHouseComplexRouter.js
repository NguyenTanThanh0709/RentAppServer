import express from 'express';
import { body, validationResult, param } from 'express-validator';
import roomingHouseComplexController from '../controllers/roomingHouseComplexController.js';

const router = express.Router();

// Add RoomingHouseComplex
router.post('/', roomingHouseComplexController.addRoomingHouseComplex);

// Get RoomingHouseComplex by ID
router.get('/:roomingHouseComplexId', roomingHouseComplexController.getRoomingHouseComplexById);
router.get('/:ownerId/owner', roomingHouseComplexController.getByOwnerId);

// Get list of RoomingHouseComplexes
router.get('/', roomingHouseComplexController.getRoomingHouseComplexList);

// Delete RoomingHouse from RoomingHouseComplex
router.delete('/:roomingHouseComplexId/:roomingHouseId', roomingHouseComplexController.deleteRoomingHouseFromComplex);

// Delete RoomingHouseComplex by ID
router.delete('/:roomingHouseComplexId', roomingHouseComplexController.deleteRoomingHouseComplexById);

export default router;