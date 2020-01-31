import { Forcast } from "./ForecastWeather";
import { WeatherStackApi } from "./WeatherStackApi";
import { OpenWeatherApi } from "./OpenWeatherApi";
import { Weather } from "./FindWeather";
import { TemperatureUnit } from "./TemperatureUnitScroll";
import { FutureDate } from "./CalculateFutureDate";
import { CurrentLocation } from "./CurrentActuallocation";

class Indexfunction
{

pageLoad()
{
    this.currentWeatherClick();
    this.weatherForecastClick();
    this.searchButton();
}

searchButton()
{
    new Weather().findLoactionData();
}

currentWeatherClick()
{
    new CurrentLocation().searchCurrentLocation();
}


weatherForecastClick()
{
    new Forcast().forcastWeather();
}


setUnitType()
{
    new TemperatureUnit().temperatureSelect();
    this.weatherForecastClick();
    this.searchButton();    
}

}

(<any>window).Indexfunction = Indexfunction;
