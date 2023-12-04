import Bill from '../models/bill.js';

class BillRepository {
  async addBill(data) {
    try {
      const newBill = new Bill(data);
      return await newBill.save();
    } catch (error) {
      throw error;
    }
  }

  async updateBill(id, data) {
    try {
      return await Bill.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async getBillsByLeaseContract(leaseContractId) {
    try {
      return await Bill.find({ leaseContract: leaseContractId }).populate('serviceCharge.serviceChargeId');
    } catch (error) {
      throw error;
    }
  }
}

export default new BillRepository();
