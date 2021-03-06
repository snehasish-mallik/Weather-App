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
            // console.log(response.body);
            callback(

                  "It is currently " +
                  response.body.current.temp_c +
                  " degrees. It feels like " +
                  response.body.current.feelslike_c +
                  " degrees. There is " +
                  response.body.current.precip_mm * 10 +
                  "% chance of rain. The Sky is: " +
                  response.body.current.condition.text +
                  "."

              );
              
    
        }
    })

}

module.exports= forecast;