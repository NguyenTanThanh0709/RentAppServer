import mongoose, {Schema, ObjectId } from 'mongoose'


const serviceCharge = new Schema({
  id: { type: ObjectId},
  servicecharge_name:{
      type: String,
      required: true,
  },
  servicecharge_img:{
      type: String,
      required: true,
  },
  status:{
      type: Boolean
  }
});

const ServiceCharge = mongoose.model('ServiceCharge', serviceCharge);

export default ServiceCharge;