import { body, validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { serviceChargeRepository } from '../repositories/index.js';

const addServiceCharge = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }

  const { servicecharge_name, servicecharge_img, status } = req.body;
  try {
    const newServiceCharge = await serviceChargeRepository.addServiceCharge({
      servicecharge_name,
      servicecharge_img,
      status,
    });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'ServiceCharge added successfully',
      data: newServiceCharge,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const getServiceChargeById = async (req, res) => {
  const { serviceChargeId } = req.params;

  try {
    const serviceCharge = await serviceChargeRepository.getServiceChargeById(serviceChargeId);

    res.status(HttpStatusCode.OK).json(serviceCharge);
  } catch (exception) {
    res.status(HttpStatusCode.NOT_FOUND).json({
      message: exception.toString(),
    });
  }
};

const getServiceChargeList = async (req, res) => {
  try {
    const serviceChargeList = await serviceChargeRepository.getServiceChargeList();

    res.status(HttpStatusCode.OK).json(serviceChargeList);
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

export default {
  addServiceCharge,
  getServiceChargeById,
  getServiceChargeList,
};
