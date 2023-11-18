const apiKey="a3c6a57f4fe253c80bf3c2f0d568a5e3";
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weatherIcon");


const geocodeurl="http://api.openweathermap.org/geo/1.0/direct?";

async function getloc(city){
    const res= await fetch(geocodeurl+`q=${city}&appid=${apiKey}`);
    var data=await res.json();
    if(Object.keys(data).length === 0)
    {
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }
    else{
    var lat=data[0].lat;
    var lon=data[0].lon;
    var name=data[0].name;
    checkWeather(lat,lon,name);
    }
    
}
async function checkWeather(lat,lon,name){
    
    const res =await fetch(apiurl+`&lat=${lat}&lon=${lon}&appid=${apiKey}`);
    var data =await res.json();
    document.querySelector(".city").innerHTML=name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°c";
    document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
    document.querySelector(".wind").innerHTML=data.wind.speed+" kmph";

    if(data.weather[0].main =="Clouds"){
        weatherIcon.src="images/clouds.png";
    }
    else if(data.weather[0].main =="Clear"){
        weatherIcon.src="images/clear.png";
    }
    else if(data.weather[0].main =="Rain"){
        weatherIcon.src="images/rain.png";
    }
    else if(data.weather[0].main =="Drizzle"){
        weatherIcon.src="images/drizzle.png";
    }
    else if(data.weather[0].main =="Mist"){
        weatherIcon.src="images/Mist.png";
    }
    else{
        weatherIcon.src="images/clouds.png";
    }
    document.querySelector(".weather").style.display="block";
}
searchBtn.addEventListener("click",()=>{
    document.querySelector(".error").style.display="none";
    document.querySelector(".weather").style.display="none";
    getloc(searchBox.value);
})
