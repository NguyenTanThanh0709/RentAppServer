import Exception from '../exceptions/Exception.js'
import {Landlord} from '../models/index.js'
import {Tenant} from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async ({email, password}) => {

    let existingUser = await Landlord.findOne({email}).exec()
    let existingUser_ = await Tenant.findOne({email}).exec()
    if(existingUser || existingUser_) {

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

    }else{
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
    const existingLandlordEmail = await Landlord.findOne({ email }).exec();
    const existingLandlordPhoneNumber = await Landlord.findOne({ phoneNumber }).exec();

    const existingTentantEmail_ = await Tenant.findOne({ email }).exec();
    const existingTentantPhoneNumber_ = await Tenant.findOne({ phoneNumber }).exec();

    if (!!existingLandlordEmail || !!existingLandlordPhoneNumber || !!existingTentantEmail_ || !!existingTentantPhoneNumber_) {
        throw new Exception(Exception.USER_EXIST);
    }


    const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS)
    );

    const newLandlord = await Landlord.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        address,
        role,
    });
    return {
        ...newLandlord._doc,
        password: "Not show",
      };
}


export default {
    login, 
    register,
}