import jwt from 'jsonwebtoken';

export const tokenGenerator = (userId)=>{
    
    try {
        const expireIn = 60*15
        const token = jwt.sign({uid:userId},process.env.JWT_SECRET,{expiresIn:expireIn});  
        console.log(token);
        return {token:token,expireIn:expireIn};
    } catch (error) {
        console.log(error);
    }
}
