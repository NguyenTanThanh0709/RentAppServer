import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import leaseContractRepository from '../repositories/leaseContractRepository.js';
import tenantRepository from '../repositories/tenantRepository.js';
import { RoomingHouseRepository } from '../repositories/index.js';

const addLeaseContract = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const leaseContractData = req.body;

    const roomingHouseId = leaseContractData.roomingHouse;

    const leaseContracts = await leaseContractRepository.getByRoomingHouse(roomingHouseId);
    const hasLeaseContractWithStatusTrue = leaseContracts.some(leaseContract => leaseContract.status === true);

    if (hasLeaseContractWithStatusTrue) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: 'Invalid request. Lease contract with status true already exists.',
      });
    }

    // Lấy dữ liệu từ tenant_phone và password
    const phoneNumber = leaseContractData.tenant_phone;
    const password = leaseContractData.password;
    const sanitizedData = { ...leaseContractData };
    delete sanitizedData.tenant_phone;
    delete sanitizedData.password;

    const foundTenant = await tenantRepository.findByPhoneAndPass(phoneNumber, password);

    if (foundTenant) {
      // Tenant found, proceed with your logic
      const convertedString = foundTenant._id.toString();
      sanitizedData.tenant = convertedString;
      console.log(sanitizedData);

      const newLeaseContract = await leaseContractRepository.add(sanitizedData);
      if(newLeaseContract){
        const updatedRoomingHouse = await RoomingHouseRepository.updateStatusAndAvailableDates(
          leaseContractData.roomingHouse,
          "RENTED",
          leaseContractData.end_date
        );
      }

      

      res.status(HttpStatusCode.INSERT_OK).json({
        message: 'Lease contract added successfully'
      });
    } else {
      console.log('Invalid phone number or password');
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: 'Invalid phone number or password',
      });
    }
  } catch (error) {
    console.error(error);

    // Handle errors and send an appropriate response
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
    });
  }
};

const updateLeaseContract = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const leaseContractData = req.body;
    const { id } = req.params;
    const roomingHouseId = leaseContractData.roomingHouse;

    // Lấy dữ liệu từ tenant_phone và password
    const phoneNumber = leaseContractData.tenant_phone;
    const password = leaseContractData.password;
    const sanitizedData = { ...leaseContractData };
    delete sanitizedData.tenant_phone;
    delete sanitizedData.password;

    const foundTenant = await tenantRepository.findByPhoneAndPass(phoneNumber, password);

    if (foundTenant) {
      // Tenant found, proceed with your logic
      const convertedString = foundTenant._id.toString();
      sanitizedData.tenant = convertedString;
      console.log(sanitizedData);

      const newLeaseContract = await leaseContractRepository.update(id,sanitizedData);
      if(newLeaseContract){
        const updatedRoomingHouse = await RoomingHouseRepository.updateStatusAndAvailableDates(
          leaseContractData.roomingHouse,
          "RENTED",
          leaseContractData.end_date
        );
      }

      

      res.status(HttpStatusCode.INSERT_OK).json({
        message: 'Lease contract update successfully'
      });
    } else {
      console.log('Invalid phone number or password');
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: 'Invalid phone number or password',
      });
    }
  } catch (error) {
    console.error(error);

    // Handle errors and send an appropriate response
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
    });
  }

};

const getLeaseContractsByTenant = async (req, res) => {
  const { tenantId } = req.params;
  try {
    const leaseContracts = await leaseContractRepository.getByTenant(tenantId);
    res.status(HttpStatusCode.OK).json(leaseContracts);
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const getLeaseContractsByLandlord = async (req, res) => {
  const { landlordId } = req.params;
  try {
    const leaseContracts = await leaseContractRepository.getByLandlord(landlordId);
    res.status(HttpStatusCode.OK).json(leaseContracts);
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const getLeaseContractsByRoomingHouse = async (req, res) => {
  const { roomingHouseId } = req.params;
  try {
    const leaseContracts = await leaseContractRepository.getByRoomingHouse(roomingHouseId);
    res.status(HttpStatusCode.OK).json(leaseContracts);
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};


const getLeaseContractById = async (req, res) => {
  const { leaseContractId } = req.params; // Assuming you have the leaseContractId in your request parameters

  try {
    const leaseContract = await leaseContractRepository.getById(leaseContractId);

    if (!leaseContract) {
      return res.status(404).json({ error: 'Lease contract not found' });
    }

    res.json(leaseContract);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export default {
  addLeaseContract,
  updateLeaseContract,
  getLeaseContractsByTenant,
  getLeaseContractsByLandlord,
  getLeaseContractsByRoomingHouse,
  getLeaseContractById
};
