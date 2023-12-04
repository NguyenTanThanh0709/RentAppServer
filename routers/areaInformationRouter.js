import express from 'express';
import { body, validationResult, param } from 'express-validator';
import areaInformationController from '../controllers/AreaInfomationController.js';

const router = express.Router();

// Endpoint to add new area information
router.post('/add',
  [
    body('areainformation_name').isString().notEmpty(),
    body('areainformation_img').isString().notEmpty(),
  ],
  areaInformationController.addAreainformation
);

// Endpoint to get area information by ID
router.get('/get/:areainformationId', param('areainformationId').isMongoId(), areaInformationController.getAreainformationById);
router.get('/list', areaInformationController.getAreainformationList);

export default router;
