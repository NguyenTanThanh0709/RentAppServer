import express from 'express';
import { body, validationResult, param  } from 'express-validator';
import amenitiesController from '../controllers/amenitiesController.js';

const router = express.Router();

// Endpoint to add a new amenity
router.post('/add', 
  [
    body('amenity_name').isString().notEmpty(),
    body('amenity_img').isString().notEmpty(),
    body('status').isBoolean(),
  ],
  amenitiesController.addAmenity
);

// Endpoint to get amenity by ID
router.get('/get/:amenityId', param('amenityId').isMongoId(), amenitiesController.getAmenityById);
router.get('/list', amenitiesController.getAmenitiesList);

export default router;

