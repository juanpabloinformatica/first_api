import jwt from "jsonwebtoken";
export const tokenValidator = (req, res, next) => {
    // console.log(req.headers.authorization.split(' ')[1]);

    try {
        let token = req.headers.authorization;
        if (!token) {
            throw new Error("token does not exist");
        }
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.uid = decoded.uid;
        next();
    } catch (error) {return res.json({error:error.message}); }
};
