import { body, validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { billRepository } from '../repositories/index.js';

const addBill = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
  
    const { amount, payment_date, description, leaseContract, serviceCharge } = req.body;
  
    try {
      const newBill = await billRepository.addBill({
        amount,
        payment_date,
        description,
        leaseContract,
        serviceCharge,
      });
  
      res.status(HttpStatusCode.INSERT_OK).json({
        message: 'Bill added successfully',
        data: newBill,
      });
    } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: exception.toString(),
      });
    }
};

const updateBill = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { billId } = req.params;
    const { amount, payment_date, description, leaseContract, serviceCharge } = req.body;

    try {
      const updatedBill = await billRepository.updateBill(billId, {
        amount,
        payment_date,
        description,
        leaseContract,
        serviceCharge,
      });

      res.status(HttpStatusCode.OK).json({
        message: 'Bill updated successfully',
        data: updatedBill,
      });
    } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: exception.toString(),
      });
    }
};

const getBillsByLeaseContract = async (req, res) => {
    const { leaseContractId } = req.params;

    try {
      const billsByLeaseContract = await billRepository.getBillsByLeaseContract(leaseContractId);

      res.status(HttpStatusCode.OK).json({
        message: 'Bills retrieved successfully',
        data: billsByLeaseContract,
      });
    } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: exception.toString(),
      });
    }
};

export default {
    addBill,
    updateBill,
    getBillsByLeaseContract,
};
