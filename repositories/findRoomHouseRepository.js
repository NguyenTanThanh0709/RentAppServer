import { FindRoomHouse } from "../models/index.js";

class FindRoomHouseRepository {
  async create(findRoomHouseData) {
    try {
      const newFindRoomHouse = new FindRoomHouse(findRoomHouseData);
      const savedFindRoomHouse = await newFindRoomHouse.save();
      return savedFindRoomHouse;
    } catch (error) {
      throw error;
    }
  }

  async update(id, findRoomHouseData) {
    try {
      const updatedFindRoomHouse = await FindRoomHouse.findByIdAndUpdate(
        id,
        findRoomHouseData,
        { new: true, runValidators: true }
      );
      return updatedFindRoomHouse;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const deletedFindRoomHouse = await FindRoomHouse.findByIdAndDelete(id);
      return deletedFindRoomHouse;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const allFindRoomHouses = await FindRoomHouse.find()
      .populate({
        path: 'amenities',
      })
      .populate({
        path: 'typehouse',
      })
      .populate({
        path: 'user',
      });
      return allFindRoomHouses;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const findRoomHouse = await FindRoomHouse.findById(id)
        .populate({
          path: 'amenities',
        })
        .populate({
          path: 'typehouse',
        })
        .populate({
          path: 'user',
        });
      return findRoomHouse;
    } catch (error) {
      throw error;
    }
  }

  async getByUser(userId) {
    try {
      const findRoomHousesByUser = await FindRoomHouse.find({ user: userId })      .populate({
        path: 'amenities',
      })
      .populate({
        path: 'typehouse',
      })
      .populate({
        path: 'user',
      });
      return findRoomHousesByUser;
    } catch (error) {
      throw error;
    }
  }

  async updateStatusById(id, newStatus) {
    try {
      const updatedFindRoomHouse = await FindRoomHouse.findByIdAndUpdate(
        id,
        { status: newStatus },
        { new: true, runValidators: true }
      );
      return updatedFindRoomHouse;
    } catch (error) {
      throw error;
    }
  }

  // Add other methods as needed

}

export default new FindRoomHouseRepository();
