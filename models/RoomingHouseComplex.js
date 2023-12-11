import mongoose, {Schema, ObjectId } from 'mongoose'
// import roomingHouse from './RoomingHouse.js'
import addressSchema from './addressSchema.js';

export default mongoose.model('RoomingHouseComplex',
    new Schema({
        id: { type: ObjectId},
        RoomingHouseComplex_name:{
            type: String,
            required: true,
        },
        image_url : {
            type: [String],
            required: true,
        },
        listroom: [{ type: Schema.Types.ObjectId, ref: 'RoomingHouse', required: false,}],
        owner: { type: Schema.Types.ObjectId, ref: 'Landlord' },
        address: {
            type: addressSchema,
            required: true,
          },
          areaInformation: [{
            areaInformationID: {
              type: Schema.Types.ObjectId,
              ref: 'AreaInformation',
              required: false,
            },
            distance: {
              type: Number,
              required: false,  
            },
            description: {
                type: String,
                required: false,  
              },
          }],

    })
)