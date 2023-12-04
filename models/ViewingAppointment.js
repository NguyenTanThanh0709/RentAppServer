import mongoose, { Schema, ObjectId } from 'mongoose';

export default mongoose.model('ViewingAppointment',
  new Schema({
    id: { type: ObjectId },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant', // Reference to the 'Tenant' model
    },
    roomingHouse: {
      type: Schema.Types.ObjectId,
      ref: 'RoomingHouse', // Reference to the 'RoomingHouse' model
    },
    appointment_date: Date,
    appointment_description: String,
    appointment_time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ['CANCELLED', 'WATCHED', 'UNCONFIRMED', 'CONFIRMED'],
        message: '{VALUE} is not a supported work',
      },  
    },
  })
);
