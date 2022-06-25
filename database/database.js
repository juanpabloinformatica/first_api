// connecting to mongo
import mongoose from 'mongoose'

const getConnected = async ()=>{
    try {
        await mongoose.connect(process.env.URI);
        console.log('Connected to mongo db'); 
    } catch (error) {
        console.log(error);
    }
}
getConnected();