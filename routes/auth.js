import express from 'express';
import { login, register } from '../controllers/userController.js';
import {body} from 'express-validator';
import { userValidator } from '../middlewares/userValidator.js';
const router = express.Router();


router.post('/register',[
    body('email','invalid email').isEmail(),
    body('password','invalid password').isLength({min:8}).custom((password,{req})=>{
        if(password!=req.body.repitPassword){
            throw new Error('both password are different');
        }else{
            return true;
        }
    })
   
],userValidator,register);
// router.post('/register')
// router.get('/login',login);
router.post('/login',login);


export default router;