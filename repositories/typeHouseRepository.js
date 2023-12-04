import {TypeHouse} from '../models/index.js'


const addTypeHouse = async ({ newTypeHouse_name }) => {
  try {
    const newTypeHouse = new TypeHouse({
      typehouse_name: newTypeHouse_name,
    });

    
    // Save the new amenity to the database
    await newTypeHouse.save();
  
      return newTypeHouse;
    } catch (error) {
      throw error;
    }
  };
  
  const getnewTypeHouseyById = async (id) => {
    try {
      const newTypeHouseId = await TypeHouse.findById(id);
      console.log(newTypeHouseId);
      if (!newTypeHouseId) {
        throw new Error('Amenity not found');
      }
  
      return newTypeHouseId;
    } catch (error) {
      throw error;
    }
  };
  
  const getTypeHousesList = async () => {
    try {
      const typeHousesList = await TypeHouse.find();
      return typeHousesList;
    } catch (error) {
      throw error;
    }
  };
  
  export default {
    addTypeHouse,
    getnewTypeHouseyById,
    getTypeHousesList,
  };