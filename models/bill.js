import mongoose, { Schema, ObjectId } from 'mongoose';

export default mongoose.model('Bill',
    new Schema({
        id: { type: ObjectId },
        amount: {
            type: Number,
            required: true
        },
        payment_date: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: false,
        },
        leaseContract: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LeaseContract', // Replace with the actual name of your RoomingHouse model
        },
    })
);
