import LeaseContract from '../models/LeaseContract.js';

class LeaseContractRepository {


  async getById(leaseContractId) {
    try {
      const leaseContract = await LeaseContract.findById(leaseContractId)
        .populate({
          path: 'tenant',
          model: 'Tenant',
        })
        .populate({
          path: 'landlord',
          model: 'Landlord',
        })
        .populate({
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
        });

      return leaseContract;
    } catch (error) {
      throw error;
    }
  }

  async add(leaseContractData) {
    try {
      const newLeaseContract = new LeaseContract(leaseContractData);
      const savedLeaseContract = await newLeaseContract.save();
      return savedLeaseContract;
    } catch (error) {
      throw error;
    }
  }

  async update(id, leaseContractData) {
    try {
      const updatedLeaseContract = await LeaseContract.findByIdAndUpdate(
        id,
        leaseContractData,
        { new: true, runValidators: true }
      );
      return updatedLeaseContract;
    } catch (error) {
      throw error;
    }
  }

  async getByTenant(tenantId) {
    try {
      const leaseContracts = await LeaseContract.find({ tenant: tenantId })
      .populate({
          path: 'tenant',
         model: 'Tenant',
  })
  .populate({
          path: 'landlord',
         model: 'Landlord',
  })
  .populate({
          path: 'roomingHouse',
         model: 'RoomingHouse',
  })
      ;
      return leaseContracts;
    } catch (error) {
      throw error;
    }
  }

  async getByLandlord(landlordId) {
    try {
      const leaseContracts = await LeaseContract.find({ landlord: landlordId })
      .populate({
        path: 'tenant',
       model: 'Tenant',
})
.populate({
        path: 'landlord',
       model: 'Landlord',
})
.populate({
        path: 'roomingHouse',       
       model: 'RoomingHouse',
       populate: [
        {
          path: 'amenities',
        },
        {
          path: 'typehouse',
      },{
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
})
      ;
      return leaseContracts;
    } catch (error) {
      throw error;
    }
  }

  async getByRoomingHouse(roomingHouseId) {
    try {
      const leaseContracts = await LeaseContract.find({ roomingHouse: roomingHouseId })
      .populate({
          path: 'tenant',
         model: 'Tenant',
  })
  .populate({
          path: 'landlord',
         model: 'Landlord',
  })
  .populate({
          path: 'roomingHouse',       
         model: 'RoomingHouse',
         populate: [
          {
            path: 'amenities',
          },
          {
            path: 'typehouse',
        },{
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
  })
      ;
      return leaseContracts;
    } catch (error) {
      throw error;
    }
  }
  
}

export default new LeaseContractRepository();
