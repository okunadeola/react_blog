import { body, } from 'express-validator';

const validators = {
    signUp: [
        body('username').notEmpty().withMessage('Usernamw is required'),
        body('email').notEmpty().withMessage('Email is required'),
        body('password').notEmpty().withMessage('Password is required'),
      ],
    signIn: [
        body('email').notEmpty().isString().withMessage('Email is required'),
        body('password').notEmpty().withMessage('Password is required'),
      ],
    googleSignIn: [
        body('email').notEmpty().isString().withMessage('Email is required'),
        body('name').notEmpty().withMessage('Password is required'),
        body('googlePhotoUrl').optional(),
      ],

      updateUser: [
        body('password').notEmpty().withMessage('Password is required'),
        body('username').matches(/^[a-zA-Z0-9]+$/).withMessage('Username can only contain letters and numbers'),
        // ...
      ]
  
  };
  
export default validators  