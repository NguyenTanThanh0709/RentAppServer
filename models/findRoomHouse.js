import mongoose, {Schema, ObjectId } from 'mongoose'


export default mongoose.model('FindRoomHouse',
    new Schema({
        id: { type: ObjectId},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tenant', // Replace with the actual name of your Tenant model
            required: true,
        },
        day_up: {
            type: Date,
            required: true // For example, you can make it a required field
        },
        typehouse: {
            type: Schema.Types.ObjectId,
            ref: 'TypeHouse',
            required: true, // Add this line if it's a required field
          },
          amenities: [{
            type: Schema.Types.ObjectId,
            ref: 'Amenities',
        }],
        peopeleNumber: {
            type: Number,
            required: false,  
          },
          maxPrice: {
            type: Number,
            required: false,  
          },
        description: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Đang hoạt động', 'Bị ẩn'],
            required: true,
        },
    })
)