import mongoose, { Schema, ObjectId } from 'mongoose';

export default mongoose.model('Payment',
    new Schema({
        id: { type: ObjectId },
        amount: {
            type: Number,
            required: true
        },
        payment_method: {
            type: String,
            required: true
        },
        payment_date: {
            type: Date,
            required: true
        }
    })
);
