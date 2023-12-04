import express from 'express';
import { body, validationResult, param } from 'express-validator';
import commentReviewController from '../controllers/commentReviewController.js';

const router = express.Router();

// Route: Create a new CommentReview
router.post('/', [
  body('tenantId').notEmpty().withMessage('Tenant ID is required'),
  body('roomingHouseId').notEmpty().withMessage('RoomingHouse ID is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
], commentReviewController.addCommentReview);

// Route: Update CommentReview by ID
router.put('/:id', [
  param('id').isMongoId().withMessage('Invalid CommentReview ID'),
  body('content').optional().notEmpty().withMessage('Content is required'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
], commentReviewController.updateCommentReview);

// Route: Delete CommentReview by ID
router.delete('/:id', [
  param('id').isMongoId().withMessage('Invalid CommentReview ID'),
], commentReviewController.deleteCommentReview);

// Route: Get comments by RoomingHouse ID
router.get('/roomingHouse/:roomingHouseId', [
  param('roomingHouseId').isMongoId().withMessage('Invalid RoomingHouse ID'),
], commentReviewController.getCommentsByRoomingHouseId);

export default router;
