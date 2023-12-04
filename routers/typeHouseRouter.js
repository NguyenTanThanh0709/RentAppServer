import express from 'express';
import { body, validationResult, param  } from 'express-validator';
import typeHouseController from '../controllers/typeHouseController.js';

const router = express.Router();

// Endpoint to add a new amenity
router.post('/add', 
  [
    body('typehouse_name').isString().notEmpty(),
  ],
  typeHouseController.addTypeHouse
);


// Endpoint to get amenity by ID
router.get('/get/:typehouseid', param('typehouseid').isMongoId(), typeHouseController.getTypeHouse);
router.get('/list', typeHouseController.getTypeHousesList);

export default router;

