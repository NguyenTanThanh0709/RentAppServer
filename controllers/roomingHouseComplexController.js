import { body, validationResult } from 'express-validator'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import { RoomingHouseComplexRepository } from '../repositories/index.js';


const addRoomingHouseComplex = async (req, res) => {
  const { RoomingHouseComplex_name, image_url, owner, address, areaInformation } = req.body;

  try {
    const newRoomingHouseComplex = await RoomingHouseComplexRepository.create({
      RoomingHouseComplex_name,
      image_url,
      owner,
      address,
      areaInformation,
    });

    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'RoomingHouseComplex added successfully',
      data: newRoomingHouseComplex,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const getRoomingHouseComplexById = async (req, res) => {
  const { roomingHouseComplexId } = req.params;

  try {
    const roomingHouseComplex = await RoomingHouseComplexRepository.getById(roomingHouseComplexId);

    res.status(HttpStatusCode.OK).json(roomingHouseComplex);
  } catch (exception) {
    res.status(HttpStatusCode.NOT_FOUND).json({
      message: exception.toString(),
    });
  }
};

const getRoomingHouseComplexList = async (req, res) => {
  try {
    const roomingHouseComplexList = await RoomingHouseComplexRepository.getList();

    res.status(HttpStatusCode.OK).json({
      message: 'List of RoomingHouseComplexes retrieved successfully',
      data: roomingHouseComplexList,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const deleteRoomingHouseFromComplex = async (req, res) => {
    const { roomingHouseComplexId, roomingHouseId } = req.params;
  
    try {
      const updatedRoomingHouseComplex = await RoomingHouseComplexRepository.deleteRoomingHouse(
        roomingHouseComplexId,
        roomingHouseId
      );
  
      if (!updatedRoomingHouseComplex) {
        return res.status(HttpStatusCode.NOT_FOUND).json({
          message: 'RoomingHouseComplex not found',
        });
      }
  
      res.status(HttpStatusCode.OK).json({
        message: 'RoomingHouse deleted from RoomingHouseComplex successfully',
        data: updatedRoomingHouseComplex,
      });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: error.toString(),
      });
    }
  };

  const deleteRoomingHouseComplexById = async (req, res) => {
    const { roomingHouseComplexId } = req.params;
  
    try {
      const deletedRoomingHouseComplex = await RoomingHouseComplexRepository.delete(roomingHouseComplexId);
  
      if (!deletedRoomingHouseComplex) {
        return res.status(HttpStatusCode.NOT_FOUND).json({
          message: 'RoomingHouseComplex not found',
        });
      }
  
      res.status(HttpStatusCode.OK).json({
        message: 'RoomingHouseComplex deleted successfully',
        data: deletedRoomingHouseComplex,
      });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: error.toString(),
      });
    }
  };


  async function getByOwnerId(req, res) {
    const ownerId = req.params.ownerId;
  
    try {
      const roomingHouseComplex = await RoomingHouseComplexRepository.getByOwnerId(ownerId);
      console.log(roomingHouseComplex);
      res.json(roomingHouseComplex);
    } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: exception.toString(),
      });
    }
  }

  const updateRoomingHouseComplex = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
  
    const { roomingHouseComplexId } = req.params;
    const roomingHouseComplexData = req.body;
  
    try {
      const updatedRoomingHouseComplex = await RoomingHouseComplexRepository.update(roomingHouseComplexId, roomingHouseComplexData);
  
      if (!updatedRoomingHouseComplex) {
        return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'RoomingHouseComplex not found' });
      }
  
      return res.status(HttpStatusCode.OK).json(updatedRoomingHouseComplex);
    } catch (error) {
      console.error(error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  };

export default {
  addRoomingHouseComplex,
  getRoomingHouseComplexById,
  getRoomingHouseComplexList,
  deleteRoomingHouseFromComplex,
  deleteRoomingHouseComplexById,
  getByOwnerId,
  updateRoomingHouseComplex
};
