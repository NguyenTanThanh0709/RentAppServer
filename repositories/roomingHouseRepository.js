import { RoomingHouse } from "../models/index.js";
import roomingHouseComplexRepository from "./roomingHouseComplexRepository.js";
class RoomingHouseRepository {

  async updateStatusAndAvailableDates(roomingHouseId, newStatus, newAvailableDates) {
    try {
      const updatedRoomingHouse = await RoomingHouse.findByIdAndUpdate(
        roomingHouseId,
        { $set: { status: newStatus, available_dates: newAvailableDates } },
        { new: true }
      );

      return updatedRoomingHouse;
    } catch (error) {
      throw error;
    }
  }



  async create(roomingHouseData) {
    try {
      const { roominghousecomplex} = roomingHouseData;
      let savedRoomingHouse;

      if (roominghousecomplex) {
        // If roominghousecomplex is provided, use the existing one
        const existingRoomingHouseComplex = await roomingHouseComplexRepository.getById(
          roominghousecomplex
        );

        if (!existingRoomingHouseComplex) {
          throw new Error("Provided RoomingHouseComplex does not exist");
        }

        // Create the RoomingHouse
        const newRoomingHouse = new RoomingHouse(roomingHouseData);
        savedRoomingHouse = await newRoomingHouse.save();

        // Add the RoomingHouse to the listroom of the existing RoomingHouseComplex
        await roomingHouseComplexRepository.addRoomingHouse(
          roominghousecomplex,
          savedRoomingHouse._id
        );
      } else {
        // If roominghousecomplex is not provided, create only the RoomingHouse
        const newRoomingHouse = new RoomingHouse(roomingHouseData);
        savedRoomingHouse = await newRoomingHouse.save();
      }

      return savedRoomingHouse;
    } catch (error) {
      throw error;
    }
  }



    
      async update(id, roomingHouseData) {
        try {
          const updatedRoomingHouse = await RoomingHouse.findByIdAndUpdate(
            id,
            roomingHouseData,
            { new: true, runValidators: true }
          );
          return updatedRoomingHouse;
        } catch (error) {
          throw error;
        }
      }
    
      async delete(id) {
        try {
          const deletedRoomingHouse = await RoomingHouse.findByIdAndDelete(id);
          return deletedRoomingHouse;
        } catch (error) {
          throw error;
        }
      }
    
      async getList() {
        try {
          const roomingHouses = await RoomingHouse.find()
          .populate({
            path: 'amenities',
          })
          .populate({
            path: 'typehouse',
          })
          .populate({
            path: 'serviceCharge.serviceChargeId',
             model: 'ServiceCharge',
          })
          .populate({
            path: 'address',
          })
          
          .populate({
            path: 'areaInformation.areaInformationID',
             model: 'AreaInformation',
          })
          .populate({
            path: 'owner',
          });
          return roomingHouses;
        } catch (error) {
          throw error;
        }
      }

      async getByOwnerId(ownerId) {
        try {
          const roomingHouses = await RoomingHouse.find({ owner: ownerId })
            .populate({
              path: 'amenities',
            })
            .populate({
              path: 'typehouse',
            })
            .populate({
              path: 'serviceCharge.serviceChargeId',
               model: 'ServiceCharge',
            })
            .populate({
              path: 'address',
            })
            
            .populate({
              path: 'areaInformation.areaInformationID',
               model: 'AreaInformation',
            })
            .populate({
              path: 'owner',
            });
    
          return roomingHouses;
        } catch (error) {
          throw error;
        }
      }


      async getListByRoomingHouseComplexId(roomingHouseComplexId) {
        try {
          const roomingHouses = await RoomingHouse.find({ roominghousecomplex: roomingHouseComplexId })
            .populate({
              path: 'amenities',
            })
            .populate({
              path: 'typehouse',
            })
            .populate({
              path: 'serviceCharge.serviceChargeId',
               model: 'ServiceCharge',
            })
            .populate({
              path: 'address',
            })
            .populate({
              path: 'roominghousecomplex',  // Populate the roominghousecomplex field
              model: 'RoomingHouseComplex', // Model to populate
            })
            .populate({
              path: 'areaInformation.areaInformationID',
               model: 'AreaInformation',
            })
            .populate({
              path: 'owner',
            });
    
          return roomingHouses;
        } catch (error) {
          throw error;
        }
      }
    
      async getById(id) {
        try {
          const roomingHouse = await RoomingHouse.findById(id)
          .populate({
            path: 'amenities',
          })
          .populate({
            path: 'typehouse',
          })
          .populate({
            path: 'serviceCharge.serviceChargeId',
             model: 'ServiceCharge',
          })
          .populate({
            path: 'address',
          })
          
          .populate({
            path: 'areaInformation.areaInformationID',
             model: 'AreaInformation',
          })
          .populate({
            path: 'owner',
          });
          
          return roomingHouse;
        } catch (error) {
          throw error;
        }
      }

      async getByCityAndDistrict(city, district) {
        try {
          const roomingHouses = await RoomingHouse.find({
            'address.city': city,
            'address.district': district,
          })
            .populate({
              path: 'serviceCharge.serviceChargeId',
        model: 'ServiceCharge',
            })
            .populate({
              path: 'amenities',
            })
            .populate({
              path: 'typehouse',
            })
            .populate({
              path: 'roominghousecomplex',  // Populate the roominghousecomplex field
              model: 'RoomingHouseComplex', // Model to populate
            })
            .populate({
              path: 'address',
            })
            .populate({
              path: 'areaInformation.areaInformationID',
               model: 'AreaInformation',
            })
            .populate({
              path: 'owner',
            });
    
          return roomingHouses;
        } catch (error) {
          throw error;
        }
      }


      async getByCity(city) {
        try {
          const roomingHouses = await RoomingHouse.find({ 'address.city': city })
            .populate({
              path: 'amenities',
            })
            .populate({
              path: 'serviceCharge.serviceChargeId',
               model: 'ServiceCharge',
            })
            .populate({
              path: 'typehouse',
            })
            .populate({
              path: 'roominghousecomplex',  // Populate the roominghousecomplex field
              model: 'RoomingHouseComplex', // Model to populate
            })
            .populate({
              path: 'address',
            })
            .populate({
              path: 'areaInformation.areaInformationID',
               model: 'Areainformation',
            })
            .populate({
              path: 'owner',
            });
    
          return roomingHouses;
        } catch (error) {
          throw error;
        }
      }

}

export default new RoomingHouseRepository();