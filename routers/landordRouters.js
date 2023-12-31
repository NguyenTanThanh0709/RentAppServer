import express from 'express'
import { body, validationResult } from 'express-validator'
import { landlordController } from '../controllers/index.js'
const router = express.Router()

router.post('/login', 
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    landlordController.login
)
router.post('/register', landlordController.register)

router.get('/common', (req, res) => {
    res.send('Hello, World!');
});

router.get('/getById/:id', landlordController.getById);
export default router