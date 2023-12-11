
import { body, validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { typeHouseRepository } from '../repositories/index.js';

const addTypeHouse = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
  
    const { typehouse_name } = req.body;
    try {
      const newtypeHouseRepository = await typeHouseRepository.addTypeHouse({
        newTypeHouse_name: typehouse_name,
      });
  
      res.status(HttpStatusCode.INSERT_OK).json({
        message: 'Amenity added successfully',
        data: newtypeHouseRepository,
      });
    } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: exception.toString(),
      });
    }
  };
  
  const getTypeHouse = async (req, res) => {
    const { typehouseid  } = req.params;
  
    try {
      const amenity = await typeHouseRepository.getnewTypeHouseyById(typehouseid );
  
      res.status(HttpStatusCode.OK).json(amenity);
    } catch (exception) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        message: exception.toString(),
      });
    }
  };
  
  const getTypeHousesList = async (req, res) => {
    try {
      const typeHousesList = await typeHouseRepository.getTypeHousesList();
  
      res.status(HttpStatusCode.OK).json(typeHousesList);
    } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: exception.toString(),
      });
    }
  };
  
  export default {
    addTypeHouse,
    getTypeHouse,
    getTypeHousesList,
  };