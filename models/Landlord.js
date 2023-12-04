import mongoose, { Schema, ObjectId } from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import isPhone from 'validator/lib/isMobilePhone.js';

export default mongoose.model('Landlord', new Schema({
  id: { type: ObjectId },

  name: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.length > 3,
      message: 'Username must be at least 3 characters',
    },
  },

  email: {
    type: String,
    validate: {
      validator: (value) => isEmail(value),
      message: 'Email is in an incorrect format',
    },
  },

  password: {
    type: String,
    required: true,
    // Password hashing/encryption logic should be added here.
  },

  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: (value) => isPhone,
      message: 'Phone is incorrect format'
    },
  },
  
  address: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: 'ADMIN', // Set the default value here without quotes
  },
}));
