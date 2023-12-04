import { ViewingAppointment } from '../models/index.js';

class ViewingAppointmentRepository {
  async create(viewingAppointmentData) {
    try {
      const newViewingAppointment = new ViewingAppointment(viewingAppointmentData);
      const savedViewingAppointment = await newViewingAppointment.save();
      return savedViewingAppointment;
    } catch (error) {
      throw error;
    }
  }

  async update(id, viewingAppointmentData) {
    try {
      const updatedViewingAppointment = await ViewingAppointment.findByIdAndUpdate(
        id,
        viewingAppointmentData,
        { new: true, runValidators: true }
      );
      return updatedViewingAppointment;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const deletedViewingAppointment = await ViewingAppointment.findByIdAndDelete(id);
      return deletedViewingAppointment;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const viewingAppointment = await ViewingAppointment.findById(id)
      .populate({
        path: 'tenant',  // Populate the roomingHouse field
        model: 'Tenant', // Model to populate
      })
      .populate({
        path: 'roomingHouse',  // Populate the roomingHouse field
        model: 'RoomingHouse', // Model to populate
      });
      return viewingAppointment;
    } catch (error) {
      throw error;
    }
  }

  async getByRoomingHouseId(roomingHouseId) {
    try {
      const viewingAppointments = await ViewingAppointment.find({ roomingHouse: roomingHouseId })
      .populate({
        path: 'tenant',  // Populate the roomingHouse field
        model: 'Tenant', // Model to populate
      })
      .populate({
        path: 'roomingHouse',  // Populate the roomingHouse field
        model: 'RoomingHouse', // Model to populate
      });
      return viewingAppointments;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const viewingAppointments = await ViewingAppointment.find()
      .populate({
        path: 'tenant',  // Populate the roomingHouse field
        model: 'Tenant', // Model to populate
      })
      .populate({
        path: 'roomingHouse',  // Populate the roomingHouse field
        model: 'RoomingHouse', // Model to populate
      });
      return viewingAppointments;
    } catch (error) {
      throw error;
    }
  }
}

export default new ViewingAppointmentRepository();
