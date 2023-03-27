const express = require("express");
const { authentication } = require("../middleware/authentication.middleware");
const { logger } = require("../middleware/logger.middleware");
const { validation } = require("../middleware/validation.middleware");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));



const {createClient} = require('redis')
const client = createClient({
    url : "redis://default:hB8nlxlUr0BfAPWbyA3m5eallHA5X3cy@redis-17239.c305.ap-south-1-1.ec2.cloud.redislabs.com:17239"
})

client.connect();



const weatherRoute = express.Router();

weatherRoute.get("/",authentication,validation, async (req, res) => {
  try {
    const { city } = req.query;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8f6d6dc47e5a9708e462d92f7b9d0909`);
    const data = await response.json();
    await client.hSet('weatherReport','city',data)
    await client.expire('weatherReport',1800);

    if(!newData){
      res.send(data)
    }else{
      let newData = await client.hGetAll('weatherReport')
      res.send(newData);
    }
  } catch (err) {
    res.send("Error in fetching the Data!");
  }
});

module.exports = { weatherRoute };
