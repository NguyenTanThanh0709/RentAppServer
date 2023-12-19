import { 
    body, 
    validationResult 
  } from 'express-validator'
import { tenantRepository } from '../repositories/index.js'
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
    let existingUser = await tenantRepository.login({email, password})
    res.status(HttpStatusCode.OK).json(existingUser)
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
  const user = await tenantRepository.register({    
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


const getById = async (req, res) => {
  const tenantId = req.params.id;
  console.log(tenantId);
  try {
    const tenant = await tenantRepository.getById(tenantId);
    if (tenant) {
      console.log(tenant);
      res.status(HttpStatusCode.OK).json(tenant);
    } else {
      res.status(HttpStatusCode.NOT_FOUND).json({
        message: 'Tenant not found',
      });
    }
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

//many other functions...
export default {
  login,
  register,
  getById
}