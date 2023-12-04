import mongoose, {Schema, ObjectId } from 'mongoose'
export default mongoose.model('Notification',
    new Schema({
        id: { type: ObjectId},
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        tenant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tenant', // Replace with the actual name of your Tenant model
            required: true,
        },
        landlord: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Landlord', // Replace with the actual name of your Landlord model
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    })
)