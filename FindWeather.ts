import { TemperatureUnit } from "./TemperatureUnitScroll";
import { WeatherStackApi } from "./WeatherStackApi";



export class Weather extends TemperatureUnit {
    temperature : any;
    description : any;
    weatherImage : any;
    locate: string;
    textBoxLocation : any;
    wind : any;
    pressure  : any;
    humid : any;
    // temperatureValue: string = "Celsius";


    constructor() {
        super();

        this.temperature = document.getElementById("temperature");
        this.description = document.getElementById("description") as HTMLParagraphElement;
        this.weatherImage = document.getElementById("imge") as HTMLImageElement;
        this.locate = ((document.getElementById("place") as HTMLInputElement).value);
        this.textBoxLocation = document.getElementById("name");
        this.wind = document.getElementById("wind");
        this.pressure = document.getElementById("pressure");
        this.humid = document.getElementById("humid");
        // this.unit = tempratueUnit;

    }


    async  findLoactionData() {
        let data;
        let respond = await fetch('http://api.weatherstack.com/current?access_key=a512b5255a5f4e11735e8cf7ebb61229&query=' + this.locate + '&units=' + this.tempratueUnit);
        data = await (respond.json());

        let weatherData = new WeatherStackApi(data) // data mapping 
        console.log(data)
            this.description.innerHTML = "It's " + weatherData.weatherDescription;                                     //put data in tags
            this.textBoxLocation.innerHTML = "your state is  " + weatherData.Location;
            this.temperature.innerHTML = "Temp => " + weatherData.temperature + " " + this.temperatureValue;
            this.wind.innerHTML = "wind speed => " + weatherData.windSpeed + " Kilometers/Hour";
            this.pressure.innerHTML = "wind pressure => " + weatherData.pressure + " Millibar";
            this.humid.innerHTML = "humidity =>   " + weatherData.humidity;
            this.weatherImage.src = weatherData.waeatherImage;
            return data
        

    }

}

(<any>window).Weather = Weather;
(<any>window).TemperatureUnit = TemperatureUnit;