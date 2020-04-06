const path = require('path')
const express=require('express')//for UI
const hbs=require('hbs')
//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app= express()

//Define path for express config
const publicDirectory= path.join(__dirname, '../public')
const viewPath= path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectory))


app.get('',(req, res)=>{
   res.render('index',{
       title:'weather',
       name:'Shubham tiwari',
       sumaary:'This information is confidential'
   })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
        error:'you must provide a address term'
    })
}

geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
    if(error){
        return res.send({error})
    }
    
    forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return res.send({error})
        }
        else{
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address

            })
        }

    })


})
    

    // res.send({
    //     forecast:'it is snowing',
    //      location:'philadelphia',
    //     address:req.query.address
    // })
})



app.get('/help', (req,res)=>{
    res.render('help',{
        title:'Node Help',
        name:'Shubham Tiwari',
        sumaary:'This information is confidential'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Node',
        name:'Shubham Tiwari',
        sumaary:'This information is confidential'
    })
})

// app.get('/help/*',(req,res)=>{
//    res.send('help artical not found')
// })

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'shubham tiwari',
        errorMessage:'help artical not found'
    })
 })

// app.get('*',(req,res)=>{
//     res.send('my 404 page')
// })

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'shubham tiwari',
        errorMessage:'Page Not Found'
    })
})


//app.com
//app.com/help
//app.com/about

app.listen(3000,()=>{
    console.log("server is up on port 3000")
})//port