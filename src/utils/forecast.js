const request = require('request')

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/9140cd08cc6e6ceaf5799a793d4a236f/'+ latitude +','+ longitude 
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connent server',undefined)
        }else if(body.error){
            callback('unable to connect weather-app',undefined)
        }else{
          callback(undefined,body.daily.data[0].summary+' it is currently '+body.currently.temperature+' degree out. there is a '+body.currently.precipProbability+' chance of rain')
  
        }
    })
  
  }

  module.exports=forecast