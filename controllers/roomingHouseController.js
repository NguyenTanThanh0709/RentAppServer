import { body, validationResult } from 'express-validator'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import { RoomingHouseRepository } from '../repositories/index.js';


async function getListByOwnerId(req, res) {
  const ownerId = req.params.ownerId;

  try {
    const roomingHouses = await RoomingHouseRepository.getByOwnerId(ownerId);
    res.json(roomingHouses);
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
}

async function getListByRoomingHouseComplexId(req, res) {
  const roomingHouseComplexId = req.params.roomingHouseComplexId;

  try {
    const roomingHouses = await RoomingHouseRepository.getListByRoomingHouseComplexId(roomingHouseComplexId);
    res.json(roomingHouses);
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
}

async function addPhongTro(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    console.log(req.body);
      const newRoomingHouse = await RoomingHouseRepository.create(req.body);
      res.status(201).json({
        message: 'Rooming house created successfully',
        data: newRoomingHouse,
      });
    } catch (exception) {
      res.status(500).json({
        message: exception.toString(),
      });
    }
}



async function getPhongTro(req, res) {
    const { id } = req.params;

  try {
    const roomingHouse = await RoomingHouseRepository.getById(id);
    if (!roomingHouse) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: 'Rooming house not found',
      });
    }
    res.json(roomingHouse);
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
}
async function deletePhongTro(req, res) {
    const { id } = req.params;

  try {
    const deletedRoomingHouse = await RoomingHouseRepository.delete(id);
    if (!deletedRoomingHouse) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: 'Rooming house not found',
      });
    }
    res.json({
      message: 'Rooming house deleted successfully',
      data: deletedRoomingHouse,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
}
async function updatePhongTro(req, res) {
    const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: errors.array(),
    });
  }

  try {
    const updatedRoomingHouse = await RoomingHouseRepository.update(id, req.body);
    if (!updatedRoomingHouse) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: 'Rooming house not found',
      });
    }
    res.json({
      message: 'Rooming house updated successfully',
      data: updatedRoomingHouse,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
}
async function getListPhongTro(req, res) {
    try {
        const roomingHouses = await RoomingHouseRepository.getList();
        res.json({
          message: 'List of rooming houses retrieved successfully',
          data: roomingHouses,
        });
      } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: exception.toString(),
        });
      }
}

async function getListByCity(req, res) {
  const { city } = req.params;

  try {
    const roomingHouses = await RoomingHouseRepository.getByCity(city);
    res.json({
      message: 'List of rooming houses by city retrieved successfully',
      data: roomingHouses,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
}

async function getListByCityAndDistrict(req, res) {
  const { city, district } = req.params;

  try {
    const roomingHouses = await RoomingHouseRepository.getByCityAndDistrict(city, district);
    res.json({
      message: 'List of rooming houses by city and district retrieved successfully',
      data: roomingHouses,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
}


async function updateStatusAndAvailableDates(req, res, next) {
  const { roomingHouseId } = req.params;
  const { newStatus, newAvailableDates } = req.body;

  try {
    const updatedRoomingHouse = await RoomingHouseRepository.updateStatusAndAvailableDates(
      roomingHouseId,
      newStatus,
      newAvailableDates
    );

    res.json(updatedRoomingHouse);
  } catch (error) {
    next(error);
  }
}


export default {
    addPhongTro,
    getPhongTro,
    deletePhongTro,
    updatePhongTro,
    getListPhongTro,
    getListByOwnerId,
    getListByCity,
    getListByRoomingHouseComplexId,
    getListByCityAndDistrict,
    updateStatusAndAvailableDates
}