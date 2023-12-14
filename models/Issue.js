import mongoose, {Schema, ObjectId } from 'mongoose'

export default mongoose.model('Issue',
    new Schema({
        id: { type: ObjectId},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tenant', // Replace with the actual name of your Tenant model
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Landlord', // Replace with the actual name of your Tenant model
            required: true,
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
        date: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['RESOLVED', 'IN_PROGRESS', 'UNRESOLVED'],
            required: true,
        },
    })
)