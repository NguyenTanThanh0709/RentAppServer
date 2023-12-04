import express from 'express';
import { body, validationResult, param } from 'express-validator';
import serviceChargeController from '../controllers/serviceChargeController.js';

const router = express.Router();

// Endpoint to add a new service charge
router.post('/add',
  [
    body('servicecharge_name').isString().notEmpty(),
    body('servicecharge_img').isString().notEmpty(),
    body('status').isBoolean(),
  ],
  serviceChargeController.addServiceCharge
);

// Endpoint to get service charge by ID
router.get('/get/:serviceChargeId', param('serviceChargeId').isMongoId(), serviceChargeController.getServiceChargeById);
router.get('/list', serviceChargeController.getServiceChargeList);

export default router;
