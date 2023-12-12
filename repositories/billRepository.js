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

  async getById(billId) {
    try {
      const bill = await Bill.findById(billId)
      .populate({
        path: 'leaseContract', // Assuming 'leaseContract' is the field referencing the LeaseContract model in the Bill model
        model: 'LeaseContract', // Model name of the LeaseContract
        populate: [
          {
            path: 'tenant',
            model: 'Tenant',
          },
          {
            path: 'landlord',
            model: 'Landlord',
          },
          {
            path: 'roomingHouse',
            model: 'RoomingHouse',
            populate: [
              {
                path: 'amenities',
              },
              {
                path: 'typehouse',
              },
              {
                path: 'owner',
              },
              {
                path: 'address',
              },
              {
                path: 'serviceCharge.serviceChargeId',
                model: 'ServiceCharge',
              },
              {
                path: 'areaInformation.areaInformationID',
                model: 'AreaInformation',
              },
            ],
          },
        ],
      })
     

    return bill;
    } catch (error) {
      throw error;
    }
  }

  async  getBillsByLeaseContract(leaseContractId) {
    try {
      const bills = await Bill.find({ leaseContract: leaseContractId })
        .populate({
          path: 'leaseContract', // Assuming 'leaseContract' is the field referencing the LeaseContract model in the Bill model
          model: 'LeaseContract', // Model name of the LeaseContract
          populate: [
            {
              path: 'tenant',
              model: 'Tenant',
            },
            {
              path: 'landlord',
              model: 'Landlord',
            },
            {
              path: 'roomingHouse',
              model: 'RoomingHouse',
              populate: [
                {
                  path: 'amenities',
                },
                {
                  path: 'typehouse',
                },
                {
                  path: 'owner',
                },
                {
                  path: 'address',
                },
                {
                  path: 'serviceCharge.serviceChargeId',
                  model: 'ServiceCharge',
                },
                {
                  path: 'areaInformation.areaInformationID',
                  model: 'AreaInformation',
                },
              ],
            },
          ],
        })
       
  
      return bills;
    } catch (error) {
      throw error;
    }
  }
}

export default new BillRepository();
