import mongoose, {Schema, ObjectId } from 'mongoose'
import addressSchema from './addressSchema.js';

export default mongoose.model('TimNguoiOGhep',
new Schema({
    id: { type: ObjectId},
    title:{
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant', // Replace with the actual name of your Tenant model
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

    status: {
        type: String,
        enum: ['Đang hoạt động', 'Bị ẩn'],
        required: true,
    },

    day_up: {
        type: Date,
        required: true // For example, you can make it a required field
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
})
)