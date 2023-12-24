import mongoose, {Schema, ObjectId } from 'mongoose'
import Tenant from './Tenant.js'
import Landlord from './Landlord.js'
import RoomingHouse from './RoomingHouse.js'
import Payment from './Payment.js'
export default mongoose.model('LeaseContract',
    new Schema({
        id: { type: ObjectId},
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
        roomingHouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RoomingHouse', // Replace with the actual name of your RoomingHouse model
        },

        create_date: {
            type: String,
            required: true,
        },
        start_date: {
            type: String,
            required: true,
        },
        end_date: {
            type: String,
            required: true,
        },
        billing_start_date: {
            type: String,
            required: true,
        },
        
        rent_price: {
            type: Number,
            required: true,
        },
        deposit: {
            type: Number,
            required: true,
        },

        cccd_front: {
            type: String,
            required: true,
        },

        cccd_back: {
            type: String,
            required: true,
        },

        payment_term: {
            type: Number,
            required: true,
        },

        image_url : {
            type: [String],
            required: true,
        },

        status: {
            type: Boolean,
        },


        is_paid: {
            type: Boolean,
        },
        payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payment', // Replace with the actual name of your Payment model
        },
    })
)