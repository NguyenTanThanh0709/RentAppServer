import Exception from '../exceptions/Exception.js'
import {Tenant} from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const findByPhoneAndPass = async (phoneNumber, password) => {
  try {
    // Find the tenant by phone number
    const tenant = await Tenant.findOne({ phoneNumber });

    // Check if the tenant exists and the provided password matches the hashed password
    if (tenant && await bcrypt.compare(password, tenant.password)) {
      return tenant;
    } else {
      return null; // Tenant not found or password does not match
    }
  } catch (error) {
    throw error;
  }

}

const login = async ({email, password}) => {
    //print('login user in user repository, haha', OutputType.INFORMATION)
    let existingUser = await Tenant.findOne({email}).exec()
    if(existingUser) {
        //not encrypt password !
        let isMatch = await bcrypt.compare(password, existingUser.password)
        if(!!isMatch) {
          //create Java Web Token
          let token = jwt.sign({
            data: existingUser
          }, 
          process.env.JWT_SECRET,{
            //expiresIn: '60', //1 minute
            expiresIn: '2 days'
          }          
        )

          return {
            ...existingUser.toObject(),
            password: "not show",
            token: token
          }
        } else {
          throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD)
        }
      } else {
        throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD)
      }
}



const register = async ({
    name,
    email, 
    password,
    phoneNumber,
    address,
    role
}) => {
    const existingTentantEmail = await Tenant.findOne({ email }).exec();
    const existingTentantPhoneNumber = await Tenant.findOne({ phoneNumber }).exec();
    if (!!existingTentantEmail || !!existingTentantPhoneNumber) {
        throw new Exception(Exception.USER_EXIST);
    }
    const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS)
    );

    const newTentant = await Tenant.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        address,
        role,
    });
    return {
        ...newTentant._doc,
        password: "Not show",
      };
}


export default {
    login, 
    register,
    findByPhoneAndPass
}