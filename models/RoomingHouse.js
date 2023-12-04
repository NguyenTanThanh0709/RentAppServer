import mongoose, {Schema, ObjectId } from 'mongoose'
import addressSchema from './addressSchema.js';
import Areainformation from './Areainformation.js';
export default mongoose.model('RoomingHouse',
    new Schema({
        id: { type: ObjectId},
        title:{
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },
        peopeleNumber: {
            type: Number,
            required: false,  
          },

        price: {
            type: Number,
            required: true,
        },

        image_url : {
            type: [String],
            required: true,
        },

        square_feet: {
            type : Number,
            required :true
        },

        rules: {
            type: [String],
            required: true,
        }
        ,
        status: {
            type: String,
            enum: {
                values: ['RENTED', 'MAINTENANCE', 'EMPTYROOM'],
                message : '{VALUE} is not s supported status ROOM'
            }
        },

        available_dates: {
            type: Date,
            required: true // For example, you can make it a required field
        },
        roominghousecomplex: {
            type: Schema.Types.ObjectId,
            ref: 'RoomingHouseComplex',
            required: false, // Add this line if it's a required field
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: 'Landlord',
            required: true, // Add this line if it's a required field
        },
        amenities: [{
            type: Schema.Types.ObjectId,
            ref: 'Amenities',
        }],

        typehouse: {
            type: Schema.Types.ObjectId,
            ref: 'TypeHouse',
            required: true, // Add this line if it's a required field
          },
          address: {
            type: addressSchema,
            required: true,
          },
          serviceCharge: [{
            serviceChargeId: {
              type: Schema.Types.ObjectId,
              ref: 'ServiceCharge',
              required: false,
            },
            price: {
              type: Number,
              required: false,  
            },
            
          }]
          ,
          areaInformation: [{
            areaInformationID: {
              type: Schema.Types.ObjectId,
              ref: 'Areainformation',
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