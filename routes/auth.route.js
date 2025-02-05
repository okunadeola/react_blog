import express from 'express';
import { google, signin, signup } from '../controllers/auth.controller.js';
import validators from '../validators/user.validate.js';
import { handleValidationErrors } from '../validators/validation.js';

const router = express.Router();


router.post('/signup', validators.signIn, handleValidationErrors, signup);
router.post('/signin', validators.signIn, handleValidationErrors, signin);
router.post('/google', validators.googleSignIn, handleValidationErrors, google)

export default router;