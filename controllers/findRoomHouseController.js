import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import findRoomHouseRepository from '../repositories/findRoomHouseRepository.js';

const createFindRoomHouse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }

  const findRoomHouseData = req.body;
  try {
    const createdFindRoomHouse = await findRoomHouseRepository.create(findRoomHouseData);
    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'Find Room House created successfully',
      data: createdFindRoomHouse,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const updateFindRoomHouse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const findRoomHouseData = req.body;
  try {
    const updatedFindRoomHouse = await findRoomHouseRepository.update(id, findRoomHouseData);
    res.status(HttpStatusCode.OK).json({
      message: 'Find Room House updated successfully',
      data: updatedFindRoomHouse,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const deleteFindRoomHouse = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFindRoomHouse = await findRoomHouseRepository.delete(id);
    res.status(HttpStatusCode.OK).json({
      message: 'Find Room House deleted successfully',
      data: deletedFindRoomHouse,
    });
  } catch (exception) {
    res.status(HttpStatusCode.NOT_FOUND).json({
      message: exception.toString(),
    });
  }
};

const getAllFindRoomHouses = async (req, res) => {
  try {
    const allFindRoomHouses = await findRoomHouseRepository.getAll();
    res.json(allFindRoomHouses);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const getFindRoomHousesByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const findRoomHousesByUser = await findRoomHouseRepository.getByUser(userId);
    res.json(findRoomHousesByUser);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const getFindRoomHousesByID = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const findRoomHousesByUser = await findRoomHouseRepository.findById(id);
    res.json(findRoomHousesByUser);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const updateFindRoomHouseStatusById = async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;
  console.log(newStatus)
  try {
    const updatedFindRoomHouse = await findRoomHouseRepository.updateStatusById(id, newStatus);
    res.json(updatedFindRoomHouse);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

export default {
  createFindRoomHouse,
  updateFindRoomHouse,
  deleteFindRoomHouse,
  getAllFindRoomHouses,
  getFindRoomHousesByUser,
  updateFindRoomHouseStatusById,
  getFindRoomHousesByID
};
