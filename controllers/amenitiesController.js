
import { body, validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { amenitiesRepository } from '../repositories/index.js';

const addAmenity = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
  
    const { amenity_name, amenity_img, status } = req.body;
  
    try {
      const newAmenity = await amenitiesRepository.addAmenity({
        amenity_name,
        amenity_img,
        status,
      });
  
      res.status(HttpStatusCode.INSERT_OK).json({
        message: 'Amenity added successfully',
        data: newAmenity,
      });
    } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: exception.toString(),
      });
    }
  };
  
  const getAmenityById = async (req, res) => {
    const { amenityId } = req.params;
  
    try {
      const amenity = await amenitiesRepository.getAmenityById(amenityId);
  
      res.status(HttpStatusCode.OK).json({
        message: 'Amenity found successfully',
        data: amenity,
      });
    } catch (exception) {
      res.status(HttpStatusCode.NOT_FOUND).json({
        message: exception.toString(),
      });
    }
  };
  
  const getAmenitiesList = async (req, res) => {
    try {
      const amenitiesList = await amenitiesRepository.getAmenitiesList();
  
      res.status(HttpStatusCode.OK).json({
        message: 'List of amenities retrieved successfully',
        data: amenitiesList,
      });
    } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: exception.toString(),
      });
    }
  };
  
  export default {
    addAmenity,
    getAmenityById,
    getAmenitiesList,
  };