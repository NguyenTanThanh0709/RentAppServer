import {Amenities} from '../models/index.js'


const addAmenity = async ({ amenity_name, amenity_img, status }) => {
    try {
      const newAmenity = new Amenities({
        amenity_name,
        amenity_img,
        status,
      });
  
      // Save the new amenity to the database
      await newAmenity.save();
  
      return newAmenity;
    } catch (error) {
      throw error;
    }
  };


const getAmenityById = async (amenityId) => {
    try {
      const amenity = await Amenities.findById(amenityId);
  
      if (!amenity) {
        throw new Error('Amenity not found');
      }
  
      return amenity;
    } catch (error) {
      throw error;
    }
  };
  
  const getAmenitiesList = async () => {
    try {
      const amenitiesList = await Amenities.find();
      return amenitiesList;
    } catch (error) {
      throw error;
    }
  };
  
  export default {
    addAmenity,
    getAmenityById,
    getAmenitiesList,
  };