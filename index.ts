import { Forcast } from "./ForecastWeather";
import { WeatherStackApi } from "./WeatherStackApi";
import { OpenWeatherApi } from "./OpenWeatherApi";
import { Weather } from "./FindWeather";
import { TemperatureUnit } from "./TemperatureUnitScroll";
import { FutureDate } from "./CalculateFutureDate";
import { CurrentLocation } from "./CurrentActuallocation";


function pageLoad()
{
    currentWeatherClick();
    weatherForecastClick();
}

function searchButton()
{
    new Weather().findLoactionData();
}

function currentWeatherClick()
{
    new CurrentLocation().searchCurrentLocation();
}


function weatherForecastClick()
{
    new Forcast().forcastWeather();
}


function setUnitType()
{
    new TemperatureUnit().temperatureSelect();
    weatherForecastClick();
}



(<any>window).pageLoad = pageLoad;
(<any>window).searchButton = searchButton;
(<any>window).currentWeatherClick = currentWeatherClick;
(<any>window).weatherForecastClick = weatherForecastClick;
(<any>window).setUnitType = setUnitType;