import mongoose, {Schema, ObjectId } from 'mongoose'
import Landlord from './Landlord.js'
import Tenant from './Tenant.js'
import RoomingHouse from './RoomingHouse.js'
import Payment from './Payment.js'
export default mongoose.model('MonthlyRent',
    new Schema({
        id: { type: ObjectId},
        landlord: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Landlord', // Replace with the actual name of your Landlord model
            required: true,
        },
        tenant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tenant', // Replace with the actual name of your Tenant model
            required: true,
        },
        roomingHouse: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RoomingHouse', // Replace with the actual name of your RoomingHouse model
        },  
        rent_price: {
            type: Number,
            required: true,
        },
        electric_bill: {
            type: Number,
            required: true,
        },
        water_bill: {
            type: Number,
            required: true,
        },
        wifi_bill: {
            type: Number,
            required: true,
        },
        car_bill: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payment', // Replace with the actual name of your Payment model
        },

    })
)