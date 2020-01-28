class WeatherStackApi {
    temperature: number;
    waeatherImage: string;
    Location: string;
    windSpeed: number;
    pressure: number;
    humidity: number;
    latitude: number;
    longitude: number;
    weatherDescription: string;
    windDirection: string;



    constructor(dataa) {

        this.latitude = dataa.location.lat;
        this.longitude = dataa.location.lon;
        this.Location = dataa.location.region;
        this.temperature = dataa.current.temperature;
        this.waeatherImage = dataa.current.weather_icons[0];
        this.humidity = dataa.current.humidity;
        this.pressure = dataa.current.pressure;
        this.windSpeed = dataa.current.wind_speed;
        this.weatherDescription = dataa.current.weather_descriptions[0];
        this.windDirection = dataa.current.wind_dir;
    }

}




class OpenWeatherApi {
    name: string;
    country: string;

    constructor(data) {
        this.name = data.name;
        this.country = data.sys.country;

    }
}





class CurrentLocation {
    State: string;
    country: string


    searchCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showCurrentDimension)
        }
        else {
            document.getElementById("long").innerHTML = "not supporting browser"
        }

    }


    async showCurrentDimension(position) {
        let apiRespond;
        let apiData;
        let weatherData;
        console.log(position.coords.latitude, " direction ", position.coords.longitude);
        apiRespond = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=dba730857b382622664ad9914d2b7304');
        apiData = await (apiRespond.json());
        weatherData = new OpenWeatherApi(apiData);

        this.State = weatherData.name;
        this.country = weatherData.country;

        console.log("runninj");
        (document.getElementById("place") as HTMLDataElement).value = this.State + ", " + this.country;
        return apiData;
        // this.find()
    }

}






class TemperatureUnit {
    temperatureValue: string = 'Celsius';
    tempratueUnit: string = 'm';

    constructor() {
        this.temperatureSelect();
    }

    temperatureUnitIndex() {
        let tempratureUnitString = document.getElementById("dropdown1") as HTMLSelectElement;
        let index;
        for (index = 0; index < tempratureUnitString.options.length; index++) {
            if (tempratureUnitString.options[index].selected === true) {
                break
            }
        }
        return index;

    }

    temperatureSelect() {

        let index = this.temperatureUnitIndex();

        if (index === 0) {
            this.tempratueUnit = 'm'
            this.temperatureValue = "Celsius";
        }
        else if (index === 1) {
            this.tempratueUnit = 's'
            this.temperatureValue = "Kelvin"
        }
        else if (index === 2) {
            this.tempratueUnit = 'f'
            this.temperatureValue = "fahrenheit";
        }
    }

}




class weather extends TemperatureUnit {
    temperature;
    description;
    weatherImage;
    locate: string;
    textBoxLocation;
    wind;
    pressure;
    humid;
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





class FutureDate
{
    constructor()
    {

    }
    getFutureDate(addDay): string {       //return date with addition to sp 
        let today = new Date();
        let dd = today.getDate();
        today.setDate(today.getDate()+addDay)
        dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();


        return (dd + "-" + mm + "-" + yyyy);
    };



}





class forcast {

    foreCastData;
    dateSet
    currentLocation
    constructor() {
        this.currentLocation = new weather();

        this.dateSet = new FutureDate()
    }



    async findCurrentLocation() {

        let respond = await fetch('http://api.weatherstack.com/current?access_key=a512b5255a5f4e11735e8cf7ebb61229&query=' + this.currentLocation.locate + '&units=' + this.currentLocation.tempratueUnit);
        let data = await (respond.json());
        return new WeatherStackApi(data);

    }





    async forcastWeather() // assigning dates to the div 
    {
        let weatherData = await this.findCurrentLocation();
        
        let setDate;

        {
            let res = await fetch("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/38cf82d8f8bd31f46313477dd41f36d5/" + weatherData.latitude + "," + weatherData.longitude);
            this.foreCastData = await (res.json());
            
            (document.getElementById("tommorow") as HTMLElement).innerHTML = "tommorow";
            
            for (setDate = 1; setDate<6 ; setDate++ )                                       // setting future dates on the button tags 
            {
                (document.getElementById("today"+setDate) as HTMLElement).innerHTML = this.dateSet.getFutureDate(setDate+1);
            }
    
        }


        this.date_fcast()
        return this.foreCastData;
    }

    



    date_fcast() {                          // put data inside the tags
        let iterate :number, index: number;
        let minimumTemperature: number;
        let maximumTEmperature: number;
        let windSpeed: number;
        let ForecastIcon: string;


        index = new TemperatureUnit().temperatureUnitIndex()

        for (iterate = 1; iterate < 7; iterate++) {
            ForecastIcon = "https://darksky.net/images/weather-icons/" + this.foreCastData["daily"]["data"][iterate]["icon"] + ".png";
            minimumTemperature = this.foreCastData["daily"]["data"][iterate]["temperatureMin"];
            maximumTEmperature = this.foreCastData["daily"]["data"][iterate]["temperatureMax"];
            windSpeed = this.foreCastData["daily"]["data"][iterate]["windSpeed"];


            (document.getElementById("icon" + iterate) as HTMLImageElement).src = ForecastIcon;
            (document.getElementById("summery" + iterate) as HTMLElement).innerHTML = "summery :- " + this.foreCastData["daily"]["data"][iterate]["summary"];
                if (index < 2) 
                {
                        (document.getElementById("mintemp" + iterate) as HTMLElement).innerHTML = "minimum temperature:-   " + this.convert(minimumTemperature) + " celsius";
                        (document.getElementById("maxtemp" + iterate) as HTMLElement).innerHTML = "maximum temperature:-    " + this.convert(maximumTEmperature) + " celsius";

                }
                else 
                {
                        (document.getElementById("mintemp" + iterate) as HTMLElement).innerHTML = "minimum temperature:- " + minimumTemperature + " fahrenheit";
                        (document.getElementById("maxtemp" + iterate) as HTMLElement).innerHTML = "maximum temperature:- " + maximumTEmperature + " fahrenheit";
                        console.log("ferenheit");
                }
            (document.getElementById("ws" + iterate) as HTMLElement).innerHTML = "Wind speed :- " + windSpeed + " Kilometers/Hour"
        }
    }
    convert(degree: number): string {
        return ((degree - 32) * 5 / 9).toFixed(2);

    }
}
