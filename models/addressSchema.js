import mongoose, { Schema } from 'mongoose';

const addressSchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  ward: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
});

export default addressSchema;