import { body, validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import searchCriteriaRepository from '../repositories/SearchCriteriaRepository.js';

const createSearchCriteria = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }

  const searchCriteriaData = req.body;
  try {
    const newSearchCriteria = await searchCriteriaRepository.create(searchCriteriaData);
    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'SearchCriteria created successfully',
      data: newSearchCriteria,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const updateSearchCriteria = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const searchCriteriaData = req.body;

  try {
    const updatedSearchCriteria = await searchCriteriaRepository.update(id, searchCriteriaData);
    res.status(HttpStatusCode.OK).json({
      message: 'SearchCriteria updated successfully',
      data: updatedSearchCriteria,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const deleteSearchCriteria = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSearchCriteria = await searchCriteriaRepository.delete(id);
    res.status(HttpStatusCode.OK).json({
      message: 'SearchCriteria deleted successfully',
      data: deletedSearchCriteria,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const getSearchCriteriaByTenantId = async (req, res) => {
  const { tenantId } = req.params;

  try {
    const searchCriteria = await searchCriteriaRepository.getByTenantId(tenantId);
    res.status(HttpStatusCode.OK).json({
      message: 'SearchCriteria retrieved successfully',
      data: searchCriteria,
    });
  } catch (exception) {
    res.status(HttpStatusCode.NOT_FOUND).json({
      message: exception.toString(),
    });
  }
};

const updateSearchCriteriaByTenantId = async (req, res) => {
  const { tenantId } = req.params;
  const searchCriteriaData = req.body;

  try {
    const updatedSearchCriteria = await searchCriteriaRepository.updateByTenantId(tenantId, searchCriteriaData);
    res.status(HttpStatusCode.OK).json({
      message: 'SearchCriteria updated successfully',
      data: updatedSearchCriteria,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

export default {
  createSearchCriteria,
  updateSearchCriteria,
  deleteSearchCriteria,
  getSearchCriteriaByTenantId,
  updateSearchCriteriaByTenantId,
};
