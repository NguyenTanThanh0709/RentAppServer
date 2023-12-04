import mongoose, {Schema, ObjectId } from 'mongoose'
import isEmail from 'validator/lib/isEmail.js'
import isPhone from 'validator/lib/isMobilePhone.js'
export default mongoose.model('Tenant',
    new Schema({
        id: { type: ObjectId},
        name: {
            type: String,
            required: true, //NOT NULL
            validate: {
                validator: (value) => value.length > 3,
                message: 'Username must be at least 3 characters'
            }
        },
        email: {
            type: String, 
            validate: {
                validator: (value) => isEmail,
                message: 'Email is incorrect format'
            }
        },
        password: { 
            //hashed/encrypted password
            type: String, 
            required: true,            
            //validate ??            
        },
        phoneNumber: { 
            type: String, 
            required: true,
            validate: {
                validator: (value) => isPhone,
                message: 'Phone is incorrect format'
            }
        },
        address: {
            type: String,
            required: false, // Set 'true' or 'false' based on your requirements
        }
        ,
        role: {
          type: String,
          default: 'USER', // Set the default value here without quotes
        },
        
    })  
)