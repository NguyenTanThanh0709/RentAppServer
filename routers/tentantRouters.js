import express from 'express'
import { body, validationResult } from 'express-validator'
import { tenantController } from '../controllers/index.js'
const router = express.Router()

router.post('/login', 
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    tenantController.login
)
router.post('/register', tenantController.register)
export default router