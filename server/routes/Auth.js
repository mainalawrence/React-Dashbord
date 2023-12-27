import {Router} from 'express';
import {register,login} from '../controllers/AuthController.js';

const router = Router();

// Register a new user
router.post('/register', register);
// Login and generate JWT token
router.post('/login', login);


export default router;