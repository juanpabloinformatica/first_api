import User from '../models/userSchema.js';


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

    try {
        const user = await  User.findOne({email});
        if(!user){
            throw new Error('there is not user with that email.');
        }
        
        if(!await user.validatePassword(password)){
            throw new Error('incorrect password.');
        }
        return res.json({message:'session iniciated.'});


    } catch (error) {
        return res.json({error:error.message});
    }
}
