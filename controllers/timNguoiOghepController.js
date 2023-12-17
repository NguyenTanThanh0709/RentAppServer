import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import timNguoiOGhepRepository from '../repositories/TimNguoiOGhepRepository.js';

const createTimNguoiOGhep = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }

  const timNguoiOGhepData = req.body;
  try {
    const createdTimNguoiOGhep = await timNguoiOGhepRepository.create(timNguoiOGhepData);
    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'Tim Nguoi O Ghep created successfully',
      data: createdTimNguoiOGhep,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const updateTimNguoiOGhep = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const timNguoiOGhepData = req.body;
  try {
    const updatedTimNguoiOGhep = await timNguoiOGhepRepository.update(id, timNguoiOGhepData);
    res.status(HttpStatusCode.OK).json({
      message: 'Tim Nguoi O Ghep updated successfully',
      data: updatedTimNguoiOGhep,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const deleteTimNguoiOGhep = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTimNguoiOGhep = await timNguoiOGhepRepository.delete(id);
    res.status(HttpStatusCode.OK).json({
      message: 'Tim Nguoi O Ghep deleted successfully',
      data: deletedTimNguoiOGhep,
    });
  } catch (exception) {
    res.status(HttpStatusCode.NOT_FOUND).json({
      message: exception.toString(),
    });
  }
};

const getAllTimNguoiOGheps = async (req, res) => {
  try {
    const allTimNguoiOGheps = await timNguoiOGhepRepository.getAll();
    res.json(allTimNguoiOGheps);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const getTimNguoiOGhepsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const timNguoiOGhepsByUser = await timNguoiOGhepRepository.getByUser(userId);
    res.json(timNguoiOGhepsByUser);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const getTimNguoiOGhepByID = async (req, res) => {
  const { id } = req.params;
  try {
    const timNguoiOGhep = await timNguoiOGhepRepository.findById(id);
    res.json(timNguoiOGhep);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const updateTimNguoiOGhepStatusById = async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;
  try {
    const updatedTimNguoiOGhep = await timNguoiOGhepRepository.updateStatusById(id, newStatus);
    res.json(updatedTimNguoiOGhep);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

export default {
  createTimNguoiOGhep,
  updateTimNguoiOGhep,
  deleteTimNguoiOGhep,
  getAllTimNguoiOGheps,
  getTimNguoiOGhepsByUser,
  getTimNguoiOGhepByID,
  updateTimNguoiOGhepStatusById,
};
