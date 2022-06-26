import User from '../models/userSchema.js';


export const register = async (req,res)=>{
    const {email,password} = req.body;
    try {
        if(await User.findOne({email})){
            throw new Error('user is the database');
        }
        const user = new User({email,password});
        await  user.save();
        return res.json({user});
    } catch (error) {
        return res.json({error : error.message});
    }
}


export const login = async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
