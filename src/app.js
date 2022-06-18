const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

const app = express()

//paths

const publicDir = path.join(__dirname,'../public')

const viewDir = path.join(__dirname, '../templates/views')

const parDir = path.join(__dirname, '../templates/partials')

//views & handlebars
app.set('view engine', 'hbs');
app.set('views', viewDir);

hbs.registerPartials(parDir)

//set up static directory

app.use(express.static(publicDir))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Snehasish Mallik'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About Page',
        name: 'Snehasish Mallik'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        helpText: 'malliksnehasish560@gmail.com',
        title: 'Help',
        name: 'Snehasish Mallik'
    })
})



app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "you must provide an address"
        })
    }
    const location = req.query.address

        
    if (!location){
        console.log("Please Provide an address...");
    }

    else{
        forecast(location, (data, error)=>{
            res.send({
                temprature: data,
                location: req.query.address
            })
            
        })
    }


    // res.send({
    //     forecaste: 'Rain',
    //     location: 'Balasore',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'Provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title:'404',
        name: 'Snehasish Mallik',
        errorMessage: 'Page Not Found!'
    })

})



//Port

app.listen(3000, ()=>{
    console.log("Server is up!");
})