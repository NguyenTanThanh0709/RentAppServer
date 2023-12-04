import express from 'express';
import { body, param } from 'express-validator';
import issueController from '../controllers/issueController.js';

const router = express.Router();

// Route: Create a new Issue
router.post('/', [
    body('user').notEmpty().withMessage('User ID is required'),
    body('room').isArray({ min: 1 }).withMessage('At least one room ID is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('status').isIn(['RESOLVED', 'IN_PROGRESS', 'UNRESOLVED']).withMessage('Invalid status'),
], issueController.createIssue);

// Route: Update Issue by ID
router.put('/:id', [
    param('id').isMongoId().withMessage('Invalid Issue ID'),
    body('user').notEmpty().withMessage('User ID is required'),
    body('room').isArray({ min: 1 }).withMessage('At least one room ID is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('status').isIn(['RESOLVED', 'IN_PROGRESS', 'UNRESOLVED']).withMessage('Invalid status'),
], issueController.updateIssue);

// Route: Delete Issue by ID
router.delete('/:id', [
    param('id').isMongoId().withMessage('Invalid Issue ID'),
], issueController.deleteIssue);

// Route: Get issues by Room ID
router.get('/room/:roomId', [
    param('roomId').isMongoId().withMessage('Invalid Room ID'),
], issueController.getIssuesByRoom);

export default router;
