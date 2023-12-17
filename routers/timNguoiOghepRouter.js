import express from 'express';
import Findtimnguoioghep from '../controllers/timNguoiOghepController.js';

const router = express.Router();

// Create a new TimNguoiOGhep
router.post('/timNguoiOGheps', Findtimnguoioghep.createTimNguoiOGhep);

// Update an existing TimNguoiOGhep by ID
router.put('/timNguoiOGheps/:id', Findtimnguoioghep.updateTimNguoiOGhep);

// Delete a TimNguoiOGhep by ID
router.delete('/timNguoiOGheps/:id', Findtimnguoioghep.deleteTimNguoiOGhep);

// Get all TimNguoiOGheps
router.get('/timNguoiOGheps', Findtimnguoioghep.getAllTimNguoiOGheps);

// Get TimNguoiOGheps by user ID
router.get('/timNguoiOGheps/user/:userId', Findtimnguoioghep.getTimNguoiOGhepsByUser);
router.get('/timNguoiOGheps/id/:id', Findtimnguoioghep.getTimNguoiOGhepByID);

// Update status of a TimNguoiOGhep by ID
router.put('/timNguoiOGheps/status/:id', Findtimnguoioghep.updateTimNguoiOGhepStatusById);

// Add other routes as needed

export default router;
