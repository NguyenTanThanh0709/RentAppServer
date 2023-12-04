import { body, validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { areaInformationRepository } from '../repositories/index.js';

const addAreainformation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }

  const { areainformation_name, areainformation_img } = req.body;
  try {
    const newAreainformation = await areaInformationRepository.addAreainformation({
      areainformation_name,
      areainformation_img,
    });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'Areainformation added successfully',
      data: newAreainformation,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const getAreainformationById = async (req, res) => {
  const { areainformationId } = req.params;

  try {
    const areainformation = await areaInformationRepository.getAreainformationById(areainformationId);

    res.status(HttpStatusCode.OK).json({
      message: 'Areainformation found successfully',
      data: areainformation,
    });
  } catch (exception) {
    res.status(HttpStatusCode.NOT_FOUND).json({
      message: exception.toString(),
    });
  }
};

const getAreainformationList = async (req, res) => {
  try {
    const areainformationList = await areaInformationRepository.getAreainformationList();

    res.status(HttpStatusCode.OK).json({
      message: 'List of area information retrieved successfully',
      data: areainformationList,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

export default {
  addAreainformation,
  getAreainformationById,
  getAreainformationList,
};
