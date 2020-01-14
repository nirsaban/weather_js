window.addEventListener('load', () => {
let long;
let lat;
let temperatureDescription = document.querySelector('.temperature-description')
let temperatureDegree = document.querySelector('.temperature-degree')
let locationTimeZone = document.querySelector('.location-timezone')
let iconDOM = document.querySelector('.icon')
let temperatureSection = document.querySelector('.temperature');
let temperatureSpan =document.querySelector('.temperature span');
let weekDescription = document.querySelector('.week-description')
let weekIconDOM = document.querySelector('.icon-week')



if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(position => {
    console.log(position)
    long = position.coords.longitude;
    lat = position.coords.latitude;
    const proxy = 'http://cors-anywhere.herokuapp.com/';
    const api = `${proxy}https://api.darksky.net/forecast/e0eafe82150d2165d0201f9129c1676e/${lat},${long}`;

fetch(api)
         .then(response =>{
             return response.json()
         })
         .then(data=>{
         console.log(data)
             const {temperature,summary,icon} = data.currently;
            const weekSummary = data.daily.summary
            const weekIcon =  data.daily.icon;
             // set DOM element from api 
             temperatureDegree.textContent = (temperature);
             temperatureDescription.textContent = summary;
             locationTimeZone.textContent = data.timezone;
                weekDescription.textContent = weekSummary;
                setIcon(weekIcon,weekIconDOM)
                setIcon(icon,iconDOM)
             })
            
        
            
             //change temperature to celsius/farehnit
             temperatureSection.addEventListener('click', () => { 
                if(temperatureSpan.textContent === 'F'){
                temperatureSpan.textContent = 'C';
                temperatureDegree.textContent = Math.floor((temperature-32)*5/9)
                 }else{
                    temperatureSpan.textContent = 'F';
                    temperatureDegree.textContent = temperature;
                 }
            
            })

         })
    
}
function setIcon(icon,iconID){
    const skycons = new Skycons({"color": "white"});
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconID ,Skycons[currentIcon]);
}

})