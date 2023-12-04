import express from 'express';
import { body, param, validationResult } from 'express-validator';
import viewingAppointmentController from '../controllers/viewingAppointmentController.js';

const router = express.Router();

// Route: Create a new ViewingAppointment
router.post(
  '/',
  [
    body('tenant').notEmpty().withMessage('Tenant ID is required'),
    body('roomingHouse').notEmpty().withMessage('RoomingHouse ID is required'),
    body('appointment_date').notEmpty().withMessage('Appointment date is required').isISO8601().toDate(),
    body('appointment_time').notEmpty().withMessage('Appointment time is required'),
    body('status').notEmpty().withMessage('Status is required').isIn(['CANCELLED', 'WATCHED', 'UNCONFIRMED', 'CONFIRMED']),
    // Add additional validation if needed
  ],
  viewingAppointmentController.createViewingAppointment
);

// Route: Update ViewingAppointment by ID
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid ViewingAppointment ID'),
    body('tenant').optional().notEmpty().withMessage('Tenant ID is required'),
    body('roomingHouse').optional().notEmpty().withMessage('RoomingHouse ID is required'),
    body('appointment_date').optional().notEmpty().withMessage('Appointment date is required').isISO8601().toDate(),
    body('appointment_time').optional().notEmpty().withMessage('Appointment time is required'),
    body('status').optional().notEmpty().withMessage('Status is required').isIn(['CANCELLED', 'WATCHED', 'UNCONFIRMED', 'CONFIRMED']),
    // Add additional validation if needed
  ],
  viewingAppointmentController.updateViewingAppointment
);

// Route: Delete ViewingAppointment by ID
router.delete('/:id', [param('id').isMongoId().withMessage('Invalid ViewingAppointment ID')], viewingAppointmentController.deleteViewingAppointment);

// Route: Get ViewingAppointment by ID
router.get('/:id', [param('id').isMongoId().withMessage('Invalid ViewingAppointment ID')], viewingAppointmentController.getViewingAppointmentById);

// Route: Get ViewingAppointments by RoomingHouse ID
router.get(
  '/roomingHouse/:roomingHouseId',
  [param('roomingHouseId').isMongoId().withMessage('Invalid RoomingHouse ID')],
  viewingAppointmentController.getViewingAppointmentsByRoomingHouseId
);

// Route: Get all ViewingAppointments
router.get('/', viewingAppointmentController.getAllViewingAppointments);

export default router;
