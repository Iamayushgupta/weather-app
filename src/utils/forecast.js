const request = require("request")
const forecast = (longitude,latitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=f8c40495ed9d7439de0071879eed0401&query=" + latitude + "," + longitude
    request({url,json:true},(error,{body}={})=>{
        if (error){
            callback("Unable to connect to the internet")
        }
        else if (body.error){
            callback("Unabale to find loaction")
        }
        else{
            callback(error,{
                temperature : body.current.temperature,
                rainpercentage : body.current.precip
            })
        }
    })
}
module.exports = forecast