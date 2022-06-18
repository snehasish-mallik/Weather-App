const { error } = require('console');
const request = require('request');


const forecast= (place, callback)=>{
    const url= 'https://api.weatherapi.com/v1/current.json?key=4b2e119701034b8ea8560212221806&q='+ place +'&aqi=no';

    request({url: url, json:true}, (error, response)=>{
        if (error){
            callback("Unable to load!");
        }
        else if(response.body.error){
            callback(response.body.error.message)
        }
    
        else{
            callback("The temprature is " +response.body.current.temp_c+ " degree Celcius with a "+response.body.current.condition.text) 
    
        }
    })

}

module.exports= forecast;