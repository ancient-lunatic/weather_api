

export class WeatherStackApi {
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



    constructor(dataa : any) {

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
(<any>window).WeatherStackApi = WeatherStackApi