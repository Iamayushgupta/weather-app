const express = require("express")
const path = require("path")
const hbs = require("hbs")
const geocode = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")

const app = express()
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicPath))


app.get("",(req,res)=>{
    res.render("index",{  
        title : "Weather",
    })
})

app.get("/weather" , (req,res)=>{
    if (!req.query.address){
        return res.send({
            error : "No address provided"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({error})
        }
    
        forecast(latitude,longitude,(error,{temperature , rainpercentage})=>{
            if (error){
                return res.send({error})
            }
            res.send( {
                location, 
                temperature,
                rainpercentage
            })
        })
    })

})

app.get("/about" , (req,res)=>{
    res.render("about",{
        title : "About",
    })
})

app.get("/help" , (req,res)=>{
    res.render("help",{
        title : "Help",
        content : "This is some helpful text"
    })
})

app.get("/products" , (req,res)=>{
    if (!req.query.search){
        res.send({
            error : "You must provide a search item"
        })
    }
    else{
        res.send({
            products : req.query.search
        })
    }
    console.log(req.query.search)
    
})


app.get("/help/*",(req,res)=>{
    res.render("404",{
        title : "404" ,
        error : "Help data not found"
    })
}) 

app.get("*", (req,res)=>{
    res.render("404",{
        title : "404",
        error : "page not found"
    })
})

app.listen(port , ()=>{
    console.log("Server started at " + port)
}) 