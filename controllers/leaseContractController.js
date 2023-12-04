import { validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import leaseContractRepository from '../repositories/leaseContractRepository.js';
import tenantRepository from '../repositories/tenantRepository.js';

const addLeaseContract = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }

  const leaseContractData = req.body;

  // Lấy dữ liệu từ tenant_phone và password
const phoneNumber = leaseContractData.tenant_phone;
const password = leaseContractData.password;

  const sanitizedData = { ...leaseContractData };


  delete sanitizedData.tenant_phone;
  delete sanitizedData.password;



  try {
    const foundTenant = await tenantRepository.findByPhoneAndPass(phoneNumber, password);
  
    if (foundTenant) {
      // Tenant found, proceed with your logic
      const convertedString = foundTenant._id.toString();
      sanitizedData.tenant = convertedString;
      console.log(sanitizedData);
      try {
        const newLeaseContract = await leaseContractRepository.add(sanitizedData);
        res.status(HttpStatusCode.INSERT_OK).json({
          message: 'Lease contract added successfully',
          data: newLeaseContract,
        });
      } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: exception.toString(),
        });
      }

    } else {
      console.log('Invalid phone number or password');
      res.status(HttpStatusCode.NOT_FOUND).json({
        message: 'Invalid phone number or password',
      });
    }
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: 'Error checking tenant',
    });
  }

};

const updateLeaseContract = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }

  const { id } = req.params;

  const { tenant_phone, password, ...leaseContractData } = req.body;
  const foundTenant = await tenantRepository.findByPhoneAndPass(tenant_phone, password);



  try {
    if(foundTenant){
      const convertedString = foundTenant._id.toString();
      leaseContractData.tenant = convertedString;
      const updatedLeaseContract = await leaseContractRepository.update(id, leaseContractData);
      res.status(HttpStatusCode.OK).json({
        message: 'Lease contract updated successfully',
        data: updatedLeaseContract,
      });
    }else{
      console.log('Invalid phone number or password');
      res.status(HttpStatusCode.NOT_FOUND).json({
        message: 'Invalid phone number or password',
      });
    }
    
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const getLeaseContractsByTenant = async (req, res) => {
  const { tenantId } = req.params;
  try {
    const leaseContracts = await leaseContractRepository.getByTenant(tenantId);
    res.status(HttpStatusCode.OK).json({
      message: 'Lease contracts retrieved successfully',
      data: leaseContracts,
    });
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
    res.status(HttpStatusCode.OK).json({
      message: 'Lease contracts retrieved successfully',
      data: leaseContracts,
    });
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
    res.status(HttpStatusCode.OK).json({
      message: 'Lease contracts retrieved successfully',
      data: leaseContracts,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

export default {
  addLeaseContract,
  updateLeaseContract,
  getLeaseContractsByTenant,
  getLeaseContractsByLandlord,
  getLeaseContractsByRoomingHouse,
};
