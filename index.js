const express = require('express');
const {connection} = require('./configs/connection');
const { userRoute } = require('./route/user.route');
const { weatherRoute } = require('./route/weather.route');
require('dotenv').config()

const app = express();
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('Welcome to the Weather Application!')
})

app.use('/users',userRoute);
app.use('/weather',weatherRoute)

app.listen(process.env.port,async(req,res)=>{
    try{
        await connection;
        console.log('Connected to the Database.');
    }catch(err){
        console.log(err)
    }
    console.log(`Server is running at the server : ${process.env.port}`);
})