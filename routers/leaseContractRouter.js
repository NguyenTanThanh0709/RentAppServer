import express from 'express';
import { body, param, validationResult } from 'express-validator';
import leaseContractController from '../controllers/leaseContractController.js';

const router = express.Router();

// Route: Create a new LeaseContract
router.post('/', [
  body('landlord').notEmpty().withMessage('Landlord ID is required'),
  body('roomingHouse').notEmpty().withMessage('roomingHouse ID is required'),
  body('create_date').notEmpty().withMessage('Create date is required'),
  body('start_date').notEmpty().withMessage('Start date is required'),
  body('end_date').notEmpty().withMessage('End date is required'),
  body('billing_start_date').notEmpty().withMessage('Billing start date is required'),
  body('rent_price').notEmpty().withMessage('Rent price is required'),
  body('deposit').notEmpty().withMessage('Deposit is required'),
  body('cccd_front').notEmpty().withMessage('CCCD front is required'),
  body('cccd_back').notEmpty().withMessage('CCCD back is required'),
  body('payment_term').notEmpty().withMessage('Payment term is required'),
  body('image_url').isArray({ min: 1 }).withMessage('At least one image URL is required'),
], leaseContractController.addLeaseContract);

// Route: Update LeaseContract by ID
router.put('/:id', [
  param('id').isMongoId().withMessage('Invalid LeaseContract ID'),
  body('tenant').optional(),
  body('landlord').optional(),
  body('roomingHouse').optional(),
  body('create_date').optional(),
  body('start_date').optional(),
  body('end_date').optional(),
  body('billing_start_date').optional(),
  body('rent_price').optional(),
  body('deposit').optional(),
  body('cccd_front').optional(),
  body('cccd_back').optional(),
  body('payment_term').optional(),
  body('image_url').optional(),
], leaseContractController.updateLeaseContract);

// Route: Get lease contracts by Tenant ID
router.get('/tenant/:tenantId', [
  param('tenantId').isMongoId().withMessage('Invalid Tenant ID'),
], leaseContractController.getLeaseContractsByTenant);

// Route: Get lease contracts by Landlord ID
router.get('/landlord/:landlordId', [
  param('landlordId').isMongoId().withMessage('Invalid Landlord ID'),
], leaseContractController.getLeaseContractsByLandlord);

// Route: Get lease contracts by RoomingHouse ID
router.get('/roominghouse/:roomingHouseId', [
  param('roomingHouseId').isMongoId().withMessage('Invalid RoomingHouse ID'),
], leaseContractController.getLeaseContractsByRoomingHouse);

router.get('/:leaseContractId', leaseContractController.getLeaseContractById);

export default router;
