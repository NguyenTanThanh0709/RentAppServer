import { 
    body, 
    validationResult 
  } from 'express-validator'
import { landlordRepository } from '../repositories/index.js'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import Exception from '../exceptions/Exception.js';

const login = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ 
      errors: errors.array() 
    });
  }
  const { email, password } = req.body;
  try {
    let existingUser = await landlordRepository.login({email, password})
    res.status(HttpStatusCode.OK).json({
      message: 'Login user successfully',
      data: existingUser
    })
  }catch(exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),      
    })
  }
 
}


const register = async (req, res) => { 
  const {
    name,
    email, 
    password,
    phoneNumber,
    address,
    role
  } = req.body
  
  try {
    debugger
    const user = await landlordRepository.register({    
      name, 
      email,     
      password, 
      phoneNumber, 
      address,
      role
    })
    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'Register user successfully',
      data: user
    })
  }catch(exception) {
    debugger
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),      
    })
  }
  
  }
  
  //many other functions...
  export default {
    login,
    register,
  }