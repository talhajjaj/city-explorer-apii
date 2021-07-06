'use strict';
const express =require ('express');
require ('dotenv').config();

const cors = require('cors');

const weather=require('./data/weather.json')

const server =express();
const PORT = process.env.PORT;

server.use(cors());

server.get('/',(req,res)=>{
    res.status(200).send('home route')
})

server.get('/test',(req,res )=>
res.status(200).send('server is working'))

// localhost:3001/weatherInfo?cityName=
server.get('/weatherInfo',(req,res)=>{
    
    let cityInfo=weather.find( city=>{
        if(req.query.cityName==city.cityName){
            return city
        }
        
        })
        const cityWeather = cityInfo.data.map(day => {
            return new City(day.valid_date, day.weather.description)
        })
        res.status(200).send(cityWeather)
})


server.get('*',(req,res)=>{
    res.status(500).send('NOT FOUND')
})



class City {
    constructor(date,description){
        this.date=date;
        this.description=description;
    }
}



server.listen(PORT,()=>{
    console.log(`Listening to PORT ${PORT}`)
})
