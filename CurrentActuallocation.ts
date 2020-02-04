import { OpenWeatherApi } from "./OpenWeatherApi";

export class CurrentLocation {


    searchCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showCurrentLocation.bind(this))
        }
        else {
            (document.getElementById("long") as HTMLParagraphElement).innerHTML  = "not supporting browser"
        }

    }
    
    async showCurrentLocation(position : any ) {

        console.log(position.coords.latitude, " direction ", position.coords.longitude);
        const apiRespond = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=dba730857b382622664ad9914d2b7304');
        const apiData = await (apiRespond.json());
        const weatherData = new OpenWeatherApi(apiData);
        const state = weatherData.name;
        const country =weatherData.country;
        (document.getElementById("place") as HTMLDataElement).value = state + ", " + country;
        return apiData;
    }

}
(<any>window).CurrentLocation = CurrentLocation