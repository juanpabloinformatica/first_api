import { validationResult } from 'express-validator';

export const userValidator = (req,res,next)=>{
    const errors = validationResult(req);
    if(errors.isEmpty()==false){
        res.json(errors.array());
    }else{
        next();
    }
}