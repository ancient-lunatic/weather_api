import { OpenWeatherApi } from "./OpenWeatherApi";

export class CurrentLocation {

   


    searchCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showCurrentDimension)
        }
        else {
            (document.getElementById("long") as HTMLParagraphElement).innerHTML  = "not supporting browser"
        }

    }
    
    async showCurrentDimension(position : any ) {
        let apiRespond;
        let apiData;
        let state: string;
        let country: string;   
        let  weatherData : OpenWeatherApi;     
        console.log(position.coords.latitude, " direction ", position.coords.longitude);
        apiRespond = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=dba730857b382622664ad9914d2b7304');
        apiData = await (apiRespond.json());
        weatherData = new OpenWeatherApi(apiData);
        console.log(typeof(weatherData.name) , weatherData.name);
        state = weatherData.name;
        console.log(typeof(weatherData.name) , weatherData.name);
        country =weatherData.country;

        console.log("runninj");
        (document.getElementById("place") as HTMLDataElement).value = state + ", " + country;
        return apiData;
        // this.find()
    }

}
(<any>window).CurrentLocation = CurrentLocation