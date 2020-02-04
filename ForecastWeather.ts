import { FutureDate } from "./CalculateFutureDate";
import { Weather } from "./FindWeather";
import { WeatherStackApi } from "./WeatherStackApi";
import { TemperatureUnit } from "./TemperatureUnitScroll";





export class ForcastWeather extends Weather {

    foreCastData: any;
    dateSet: FutureDate;
    currentLocation: Weather
    constructor() {
        super();
        this.currentLocation = new Weather();

        this.dateSet = new FutureDate()
    }



    async getLocationForecastData() {

        let respond = await fetch('http://api.weatherstack.com/current?access_key=a512b5255a5f4e11735e8cf7ebb61229&query=' + this.currentLocation.locate + '&units=' + this.currentLocation.tempratueUnit);
        let data = await (respond.json());
        return new WeatherStackApi(data);

    }





    async setDataOnHTMLPage()  // assigning dates to the div 
    {
        let weatherData = await this.getLocationForecastData();

        let setDates;

        {
            let res = await fetch("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/38cf82d8f8bd31f46313477dd41f36d5/" + weatherData.latitude + "," + weatherData.longitude);
            this.foreCastData = await (res.json());

            (document.getElementById("tommorow") as HTMLElement).innerHTML = "tommorow";

            for (setDates = 1; setDates < 6; setDates++)                                       // setting future dates on the button tags 
            {
                (document.getElementById("today" + setDates) as HTMLElement).innerHTML = this.dateSet.getFutureDate(setDates + 1);
            }

        }


        this.setForecastData()
        return this.foreCastData;
    }





    setForecastData() {                          // put data inside the tags
        let iterate: number;
        let minimumTemperature: number;
        let maximumTEmperature: number;
        let windSpeed: number;
        let ForecastIcon: string;


        const index = new TemperatureUnit().getTemperatureUnitIndex()

        for (iterate = 1; iterate < 7; iterate++) {
            ForecastIcon = "https://darksky.net/images/weather-icons/" + this.foreCastData["daily"]["data"][iterate]["icon"] + ".png";
            minimumTemperature = this.foreCastData["daily"]["data"][iterate]["temperatureMin"];
            maximumTEmperature = this.foreCastData["daily"]["data"][iterate]["temperatureMax"];
            windSpeed = this.foreCastData["daily"]["data"][iterate]["windSpeed"];


            (document.getElementById("icon" + iterate) as HTMLImageElement).src = ForecastIcon;
            (document.getElementById("summery" + iterate) as HTMLElement).innerHTML = "summery :- " + this.foreCastData["daily"]["data"][iterate]["summary"];
            if (index < 2) {
                (document.getElementById("mintemp" + iterate) as HTMLElement).innerHTML = "minimum temperature:-   " + this.convertTemperature(minimumTemperature) + " celsius";
                (document.getElementById("maxtemp" + iterate) as HTMLElement).innerHTML = "maximum temperature:-    " + this.convertTemperature(maximumTEmperature) + " celsius";

            }
            else {
                (document.getElementById("mintemp" + iterate) as HTMLElement).innerHTML = "minimum temperature:- " + minimumTemperature + " fahrenheit";
                (document.getElementById("maxtemp" + iterate) as HTMLElement).innerHTML = "maximum temperature:- " + maximumTEmperature + " fahrenheit";
                console.log("ferenheit");
            }
            (document.getElementById("ws" + iterate) as HTMLElement).innerHTML = "Wind speed :- " + windSpeed + " Kilometers/Hour"
        }
    }

    convertTemperature(degree: number): string {
        return ((degree - 32) * 5 / 9).toFixed(2);
    }
}

(<any>window).ForecastWeather = ForcastWeather