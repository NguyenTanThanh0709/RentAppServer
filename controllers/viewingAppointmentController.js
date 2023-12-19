import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import viewingAppointmentRepository from '../repositories/viewingAppointmentRepository.js';

const createViewingAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }

  const { tenant, roomingHouse, appointment_date, appointment_time, status } = req.body;

  try {
    const newViewingAppointment = await viewingAppointmentRepository.create({
      tenant,
      roomingHouse,
      appointment_date,
      appointment_time,
      status,
    });

    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'ViewingAppointment created successfully',
      data: newViewingAppointment,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const updateViewingAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { tenant, roomingHouse, appointment_date, appointment_time, status } = req.body;

  try {
    const updatedViewingAppointment = await viewingAppointmentRepository.update(id, {
      tenant,
      roomingHouse,
      appointment_date,
      appointment_time,
      status,
    });

    res.status(HttpStatusCode.OK).json({
      message: 'ViewingAppointment updated successfully',
      data: updatedViewingAppointment,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const deleteViewingAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedViewingAppointment = await viewingAppointmentRepository.delete(id);

    res.status(HttpStatusCode.OK).json({
      message: 'ViewingAppointment deleted successfully',
      data: deletedViewingAppointment,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const getViewingAppointmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const viewingAppointment = await viewingAppointmentRepository.getById(id);

    res.status(HttpStatusCode.OK).json({
      message: 'ViewingAppointment found successfully',
      data: viewingAppointment,
    });
  } catch (exception) {
    res.status(HttpStatusCode.NOT_FOUND).json({
      message: exception.toString(),
    });
  }
};

const getViewingAppointmentsByRoomingHouseId = async (req, res) => {
  const { roomingHouseId } = req.params;

  try {
    const viewingAppointments = await viewingAppointmentRepository.getByRoomingHouseId(roomingHouseId);

    res.status(HttpStatusCode.OK).json(viewingAppointments);
  } catch (exception) {
    res.status(HttpStatusCode.NOT_FOUND).json({
      message: exception.toString(),
    });
  }
};

const getAllViewingAppointments = async (req, res) => {
  try {
    const viewingAppointments = await viewingAppointmentRepository.getAll();

    res.status(HttpStatusCode.OK).json({
      message: 'All ViewingAppointments retrieved successfully',
      data: viewingAppointments,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

export default {
  createViewingAppointment,
  updateViewingAppointment,
  deleteViewingAppointment,
  getViewingAppointmentById,
  getViewingAppointmentsByRoomingHouseId,
  getAllViewingAppointments,
};
