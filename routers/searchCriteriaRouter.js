import express from 'express';
import { body, validationResult, param } from 'express-validator';
import searchCriteriaController from '../controllers/searchCriteriaController.js';

const router = express.Router();

// Create SearchCriteria
router.post('/', [
  // Add validation middleware if needed
], searchCriteriaController.createSearchCriteria);

// Update SearchCriteria by ID
router.put('/:id', [
  // Add validation middleware if needed
], searchCriteriaController.updateSearchCriteria);

// Delete SearchCriteria by ID
router.delete('/:id', searchCriteriaController.deleteSearchCriteria);

// Get SearchCriteria by Tenant ID
router.get('/tenant/:tenantId', searchCriteriaController.getSearchCriteriaByTenantId);
router.get('/getall', searchCriteriaController.findAll);

// Update SearchCriteria by Tenant ID
router.put('/tenant/:tenantId', [
  // Add validation middleware if needed
], searchCriteriaController.updateSearchCriteriaByTenantId);

export default router;
