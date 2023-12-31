import { body, validationResult } from 'express-validator';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import { billRepository } from '../repositories/index.js';

const addBill = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
  
    const { amount, payment_date, description, leaseContract, status } = req.body;
  
    try {
      const newBill = await billRepository.addBill(req.body);
      
      res.status(HttpStatusCode.INSERT_OK).json({
        message: newBill._id
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
    const { amount, payment_date, description, leaseContract, status } = req.body;

    try {
      const updatedBill = await billRepository.updateBill(billId, {
        amount,
        payment_date,
        description,
        leaseContract,
        status,
      });

      res.status(HttpStatusCode.OK).json({
        message: updatedBill._id
       
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

      res.status(HttpStatusCode.OK).json(billsByLeaseContract);
    } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: exception.toString(),
      });
    }
};

const getBillById = async (req, res) => {
  const { billId } = req.params;
  console.log(billId);

  try {
    const bill = await billRepository.getById(billId);

    if (!bill) {
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Bill not found' });
    }

    res.status(HttpStatusCode.OK).json(bill);
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
  getBillById, // Add the new function here
};
