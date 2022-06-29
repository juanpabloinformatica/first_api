'use strict'
import 'dotenv/config';
import './database/database.js';
import express from 'express';
import auth from './routes/auth.js';
const app = express();



//middlewares
app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('./public'));



app.use('/api/v1/user',auth);


app.listen(5000,()=>{
    console.log('Working');
})





