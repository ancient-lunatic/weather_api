import {ForcastWeather } from "./ForecastWeather";
import { WeatherStackApi } from "./WeatherStackApi";
import { OpenWeatherApi } from "./OpenWeatherApi";
import { Weather } from "./FindWeather";
import { TemperatureUnit } from "./TemperatureUnitScroll";
import { FutureDate } from "./CalculateFutureDate";
import { CurrentLocation } from "./CurrentActuallocation";



class IndexClass
{

pageLoad()
{
    this.currentWeatherClick();
    this.weatherForecastClick();
    this.searchButton();
}

searchButton()
{
    new Weather().setLoactionData();
}

currentWeatherClick()
{
    new CurrentLocation().searchCurrentLocation();
}


weatherForecastClick()
{
    new ForcastWeather().setDataOnHTMLPage();
}


setUnitType()
{
    new TemperatureUnit().setTemperatureUnit();
    this.weatherForecastClick();
    this.searchButton();    
}

}

(<any>window).IndexClass = IndexClass;
