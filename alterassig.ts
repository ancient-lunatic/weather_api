
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
        // while( this.dataa !== 'undefined');
    }

}

class OpenWeatherApi {
    name: string;
    country : string;

    constructor(data) {
        this.name = data.name;
        this.country = data.sys.country;    

    }
}

class weather {
    temperature;
    description;
    weatherImage;
    locate: string;
    textBoxLocation;
    wind;
    pressure;
    humid;
    unit;
    temperatureValue: string = "Celsius";


    constructor(temperatureInitials = 'f') {
        this.temperature = document.getElementById("temperature");
        this.description = document.getElementById("description") as HTMLParagraphElement;
        this.weatherImage = document.getElementById("imge") as HTMLImageElement;
        this.locate = ((document.getElementById("place") as HTMLInputElement).value);
        this.textBoxLocation = document.getElementById("name");
        this.wind = document.getElementById("wind");
        this.pressure = document.getElementById("pressure");
        this.humid = document.getElementById("humid");
        this.unit = temperatureInitials;

    }



    temperatureUnitIndex() {
        let x = document.getElementById("dropdown1") as HTMLSelectElement;
        let index;
        for (index = 0; index < x.options.length; index++) {
            if (x.options[index].selected === true) {
                break
            }
        }
        return index;

    }

    temperature_unit() {

        let index = this.temperatureUnitIndex();

        if (index === 0) {
            this.unit = 'm'
            this.temperatureValue = "Celsius";
        }
        else if (index === 1) {
            this.unit = 's'
            this.temperatureValue = "Kelvin"
        }
        else if (index === 2) {
            this.unit = 'f'
            this.temperatureValue = "fahrenheit";
        }
        this.find();


    }

    current_loc() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition)
        }
        else {
            document.getElementById("long").innerHTML = "not supporting browser"
        }

    }

    async showPosition(position) {
        let locapi: string;
        let res;
        let country;
        let data;
        let weatherData;
        console.log(position.coords.latitude, " direction ", position.coords.longitude);
        res = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=dba730857b382622664ad9914d2b7304');
        data = await (res.json());
        weatherData = new OpenWeatherApi(data);

        this.locate =weatherData.name;
        country =weatherData.country;

        console.log("runninj");
        (document.getElementById("place") as HTMLDataElement).value = this.locate +", "+ country ;
        this.find()
        
    }



    async  find() {
        let data;
        let respond = await fetch('http://api.weatherstack.com/current?access_key=c55132a6234cad11948e6cd8a696ef04&query=' + this.locate + '&units=' + this.unit);
        data = await (respond.json());
        let weatherData = new WeatherStackApi(data)
        console.log(data)
        {

            this.description.innerHTML = "It's " + weatherData.weatherDescription;;
            this.textBoxLocation.innerHTML = "your state is  " + weatherData.Location;
            this.temperature.innerHTML = "Temp => " + weatherData.temperature + " " + this.temperatureValue;
            this.wind.innerHTML = "wind speed => " + weatherData.windSpeed + " Kilometers/Hour";
            this.pressure.innerHTML = "wind pressure => " + weatherData.pressure + " Millibar";
            this.humid.innerHTML = "humidity =>   " + weatherData.humidity;



            this.weatherImage.src = weatherData.waeatherImage;
            return data
        }

    }

}
class forcast extends weather {
    latitude: number = 0;
    longitude: number = 0;
    forCastData;

    constructor() {
        super();
    }

    async find_data() {

        let respond = await fetch('http://api.weatherstack.com/current?access_key=c55132a6234cad11948e6cd8a696ef04&query=' + this.locate + '&units=' + this.unit);
        let data = await (respond.json());
        let weatherData = new WeatherStackApi(data)

        this.latitude = weatherData.latitude;
        this.longitude = weatherData.longitude;
        console.log(this.latitude, this.longitude)
        return data;

    }

    async forcast_weather() // assigning dates to the div 
    {
        await this.find_data();

        {
            let res = await fetch("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/38cf82d8f8bd31f46313477dd41f36d5/" + this.latitude + "," + this.longitude);
            this.forCastData = await (res.json());
            


            // (document.getElementById("today") as HTMLElement).innerHTML = "today";
            (document.getElementById("tommorow") as HTMLElement).innerHTML = "tommorow";
            (document.getElementById("today1") as HTMLElement).innerHTML = this.curday(2);
            (document.getElementById("today2") as HTMLElement).innerHTML = this.curday(3);
            (document.getElementById("today3") as HTMLElement).innerHTML = this.curday(4);
            (document.getElementById("today4") as HTMLElement).innerHTML = this.curday(5);
            (document.getElementById("today5") as HTMLElement).innerHTML = this.curday(6);

        }
        this.date_fcast()
    }

    curday(addDay): string {       //return date with addition to sp 
        let today = new Date();
        let dd = today.getDate();
        dd = dd + addDay;
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();


        return (dd + "-" + mm + "-" + yyyy);
    };

    date_fcast() {
        let i, index: number;
        let val: string;
        let min_temp: number;
        let max_temp: number;
        let unit = this.unit;
        let windSpeed: number;
        let icon: string;


        index = this.temperatureUnitIndex()
        for (i = 1; i < 7; i++) {
            icon = "https://darksky.net/images/weather-icons/" + this.forCastData["daily"]["data"][i]["icon"] + ".png";
            min_temp = this.forCastData["daily"]["data"][i]["temperatureMin"];
            max_temp = this.forCastData["daily"]["data"][i]["temperatureMax"];
            windSpeed = this.forCastData["daily"]["data"][i]["windSpeed"];


            (document.getElementById("icon" + i) as HTMLImageElement).src = icon;
            (document.getElementById("summery" + i) as HTMLElement).innerHTML = "summery :- " + this.forCastData["daily"]["data"][i]["summary"];
            if (index < 2) {
                (document.getElementById("mintemp" + i) as HTMLElement).innerHTML = "minimum temperature:-   " + this.convert(min_temp) + " celsius";
                (document.getElementById("maxtemp" + i) as HTMLElement).innerHTML = "maximum temperature:-    " + this.convert(max_temp) + " celsius";

            }
            else {
                (document.getElementById("mintemp" + i) as HTMLElement).innerHTML = "minimum temperature:- " + min_temp + " fahrenheit";
                (document.getElementById("maxtemp" + i) as HTMLElement).innerHTML = "maximum temperature:- " + max_temp + " fahrenheit";
                console.log("ferenheit");

            }
            (document.getElementById("ws" + i) as HTMLElement).innerHTML = "Wind speed :- " + windSpeed + " Kilometers/Hour"
        }
    }
    convert(degree: number): string {
        return ((degree - 32) * 5 / 9).toFixed(2);

    }
}
