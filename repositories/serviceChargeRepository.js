import {ServiceCharge} from '../models/index.js'


const addServiceCharge = async ({ servicecharge_name, servicecharge_img, status }) => {
    try {
      const newServiceCharge = new ServiceCharge({
        servicecharge_name,
        servicecharge_img,
        status,
      });

      console.log(newServiceCharge)
  
      // Save the new serviceCharge to the database
      await newServiceCharge.save();
  
      return newServiceCharge;
    } catch (error) {
      throw error;
    }
  };


const getServiceChargeById = async (amenityId) => {
    try {
      const amenity = await ServiceCharge.findById(amenityId);
  
      if (!amenity) {
        throw new Error('newServiceCharge not found');
      }
  
      return amenity;
    } catch (error) {
      throw error;
    }
  };
  
  const getServiceChargeList = async () => {
    try {
      const amenitiesList = await ServiceCharge.find();
      return amenitiesList;
    } catch (error) {
      throw error;
    }
  };
  
  export default {
    addServiceCharge,
    getServiceChargeById,
    getServiceChargeList,
  };