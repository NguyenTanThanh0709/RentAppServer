import mongoose, {Schema, ObjectId } from 'mongoose'


export default mongoose.model('Post',
    new Schema({
        id: { type: ObjectId},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Landlord', // Replace with the actual name of your Tenant model
            required: true,
        },
        deposit: {
            type: Number,
            required: true,
        },
        day_up: {
            type: Date,
            required: true // For example, you can make it a required field
        },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RoomingHouse', // Replace with the actual name of your RoomingHouse model
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Trọ Chưa Được Thuê', 'Trọ Đã Được Thuê', 'Bài Viết Hết Hiệu Lực'],
            required: true,
        },
    })
)