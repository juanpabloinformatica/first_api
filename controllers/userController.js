import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
import { tokenGenerator } from '../utils/tokenManager.js';

export const register = async (req,res)=>{
    const {email,password} = req.body;
    try {
        if(await User.findOne({email})){
            throw new Error('user is in the database');
        }
        const user = new User({email,password});
        await  user.save();
        return res.json({user});
    } catch (error) {
        return res.json({error : error.message});
    }
}


export const login = async (req,res)=>{
    const {email,password} = req.body;
        console.log(email,password);
    try {
        const user = await  User.findOne({email});
        if(!user){
            throw new Error('there is not user with that email.');
        }
        
        if(!await user.validatePassword(password)){
            throw new Error('incorrect password.');
        }
        // const token = jwt.sign({uid:user._id},process.env.JWT_SECRET);
        const {token,expireIn} = tokenGenerator(user._id);
        
        return res.json({token,expireIn});

    } catch (error) {
        return res.json({error:error.message});
    }
}
export const infoUser = async(req,res)=>{
    try {
        const user = await User.findById(req.uid).lean();
        return res.send({email:`${user.email}`,id:`${user._id}`});
    } catch (error) {
        res.status(500).send({error:error.message});
    }
    
}
