import { RoomingHouseComplex } from "../models/index.js";

class RoomingHouseComplexRepository {

  async create(roomingHouseComplexData) {
    try {
      const newRoomingHouseComplex = new RoomingHouseComplex(roomingHouseComplexData);
      const savedRoomingHouseComplex = await newRoomingHouseComplex.save();
      return savedRoomingHouseComplex;
    } catch (error) {
      throw error;
    }
  }

  async update(id, roomingHouseComplexData) {
    try {
      const updatedRoomingHouseComplex = await RoomingHouseComplex.findByIdAndUpdate(
        id,
        roomingHouseComplexData,
        { new: true, runValidators: true }
      );
      return updatedRoomingHouseComplex;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const deletedRoomingHouseComplex = await RoomingHouseComplex.findByIdAndDelete(id);
      return deletedRoomingHouseComplex;
    } catch (error) {
      throw error;
    }
  }

  async deleteRoomingHouse(roomingHouseComplexId, roomingHouseId) {
    try {
      const updatedRoomingHouseComplex = await RoomingHouseComplex.findByIdAndUpdate(
        roomingHouseComplexId,
        { $pull: { listroom: roomingHouseId } },
        { new: true }
      );

      return updatedRoomingHouseComplex;
    } catch (error) {
      throw error;
    }
  }

  async addRoomingHouse(roomingHouseComplexId, roomingHouseId) {
    try {
      const updatedRoomingHouseComplex = await RoomingHouseComplex.findByIdAndUpdate(
        roomingHouseComplexId,
        { $push: { listroom: roomingHouseId } },
        { new: true }
      );

      return updatedRoomingHouseComplex;
    } catch (error) {
      throw error;
    }
  }

  async getList() {
    try {
      const roomingHouseComplexes = await RoomingHouseComplex.find()
        .populate({
          path: 'listroom',
        })
        .populate({
          path: 'owner',
        })
        .populate({
          path: 'areaInformation.areaInformationID',
         model: 'AreaInformation',
  });

      return roomingHouseComplexes;
    } catch (error) {
      throw error;
    }
  }


  async getByOwnerId(ownerId) {
    try {
      const roomingHouseComplex = await RoomingHouseComplex.findOne({ owner: ownerId })
      .populate({
        path: 'listroom',
      })
      .populate({
        path: 'owner',
      })
      .populate({
              path: 'areaInformation.areaInformationID',
             model: 'AreaInformation',
      });

      return roomingHouseComplex;
    } catch (error) {
      throw error;
    }
  }


  

  async getById(id) {
    try {
      const roomingHouseComplex = await RoomingHouseComplex.findById(id)
        .populate({
          path: 'listroom',
        })
        .populate({
          path: 'owner',
        })
        .populate({
                path: 'areaInformation.areaInformationID',
               model: 'AreaInformation',
        });

      return roomingHouseComplex;
    } catch (error) {
      throw error;
    }
  }
}

export default new RoomingHouseComplexRepository();
