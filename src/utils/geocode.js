const request=require('request')

//--------------------------------step 1

// const geocode=(address,callback)=>{
//     const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFwc2h1YmhhbTc3IiwiYSI6ImNrOGp5MHpqNTAwYXQzZm1ua2o4ZzVpZnUifQ.6gDAq86NVgupvN87_MOcsg&limit=1'
//     request({url:url,json:true},(error,response)=>{
//         if(error){
//             callback('unable to connect weather server',undefined)
    
//         }else if(response.body.error){
//              callback('unable to find location',undefined)
//         }else{
       
         
//           callback(undefined,{
//               latitude:response.body.features[0].center[1],
//               longitude:response.body.features[0].center[0],
//               location:response.body.features[0].place_name  
//           })
//         }
    
//     })    
// }

// module.exports=geocode

//----------------------------------------------------step 2(destructuring and shorthand)

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFwc2h1YmhhbTc3IiwiYSI6ImNrOGp5MHpqNTAwYXQzZm1ua2o4ZzVpZnUifQ.6gDAq86NVgupvN87_MOcsg&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect weather server',undefined)
    
        }else if(body.error){
             callback('unable to find location',undefined)

        }else if(body.features.length == 0){

            callback("Found Nothing", undefined)
            
        }else{
       
         
          callback(undefined,{
              latitude:body.features[0].center[1],
              longitude:body.features[0].center[0],
              location:body.features[0].place_name  
          })
        }
    
    })    
}

module.exports=geocode
