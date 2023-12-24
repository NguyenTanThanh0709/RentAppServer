import express from 'express';
import { body } from 'express-validator';
import billController from '../controllers/billController.js';

const router = express.Router();

// Route to add a new bill
router.post(
  '/add',
  [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('payment_date').optional().isString(),
    body('leaseContract').isMongoId().withMessage('Invalid leaseContract ID'),
    body('status').isBoolean().withMessage('Status must be a boolean')
    // You might want to add validation for serviceCharge here
  ],
  billController.addBill
);

// Route to update a bill by ID
router.put(
  '/update/:billId',
  [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('payment_date').optional().isString(),
    body('description').optional().isString(),
    body('leaseContract').isMongoId().withMessage('Invalid leaseContract ID'),
    body('status').isBoolean().withMessage('Status must be a boolean')
    // You might want to add validation for serviceCharge here
  ],
  billController.updateBill
);

// Route to get bills by LeaseContract ID
router.get('/list/:leaseContractId', billController.getBillsByLeaseContract);

router.get('/one/:billId', billController.getBillById);

export default router;
