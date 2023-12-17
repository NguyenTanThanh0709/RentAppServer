import mongoose, { Schema, ObjectId } from 'mongoose';
import { FindTimNguoiOGhep } from "../models/index.js";
class TimNguoiOGhepRepository {
  async create(timNguoiOGhepData) {
    try {
      const newTimNguoiOGhep = new FindTimNguoiOGhep(timNguoiOGhepData);
      const savedTimNguoiOGhep = await newTimNguoiOGhep.save();
      return savedTimNguoiOGhep;
    } catch (error) {
      throw error;
    }
  }

  async update(id, timNguoiOGhepData) {
    try {
      const updatedTimNguoiOGhep = await FindTimNguoiOGhep.findByIdAndUpdate(
        id,
        timNguoiOGhepData,
        { new: true, runValidators: true }
      );
      return updatedTimNguoiOGhep;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const deletedTimNguoiOGhep = await FindTimNguoiOGhep.findByIdAndDelete(id);
      return deletedTimNguoiOGhep;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const allTimNguoiOGheps = await FindTimNguoiOGhep.find()
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
          path: 'user',
        });
      return allTimNguoiOGheps;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      const timNguoiOGhep = await FindTimNguoiOGhep.findById(id)
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
          path: 'user',
        });
      return timNguoiOGhep;
    } catch (error) {
      throw error;
    }
  }

  async getByUser(userId) {
    try {
      const timNguoiOGhepsByUser = await FindTimNguoiOGhep.find({ user: userId })
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
          path: 'user',
        });
      return timNguoiOGhepsByUser;
    } catch (error) {
      throw error;
    }
  }

  async updateStatusById(id, newStatus) {
    try {
      const updatedTimNguoiOGhep = await FindTimNguoiOGhep.findByIdAndUpdate(
        id,
        { status: newStatus },
        { new: true, runValidators: true }
      );
      return updatedTimNguoiOGhep;
    } catch (error) {
      throw error;
    }
  }
}

export default new TimNguoiOGhepRepository();
