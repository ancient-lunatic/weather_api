var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var WeatherStackApi = /** @class */ (function () {
    function WeatherStackApi(dataa) {
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
    return WeatherStackApi;
}());
var OpenWeatherApi = /** @class */ (function () {
    function OpenWeatherApi(data) {
        this.name = data.name;
        this.country = data.sys.country;
    }
    return OpenWeatherApi;
}());
var CurrentLocation = /** @class */ (function () {
    function CurrentLocation() {
    }
    CurrentLocation.prototype.searchCurrentLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showCurrentDimension);
        }
        else {
            document.getElementById("long").innerHTML = "not supporting browser";
        }
    };
    CurrentLocation.prototype.showCurrentDimension = function (position) {
        return __awaiter(this, void 0, void 0, function () {
            var apiRespond, apiData, weatherData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(position.coords.latitude, " direction ", position.coords.longitude);
                        return [4 /*yield*/, fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=dba730857b382622664ad9914d2b7304')];
                    case 1:
                        apiRespond = _a.sent();
                        return [4 /*yield*/, (apiRespond.json())];
                    case 2:
                        apiData = _a.sent();
                        weatherData = new OpenWeatherApi(apiData);
                        this.State = weatherData.name;
                        this.country = weatherData.country;
                        console.log("runninj");
                        document.getElementById("place").value = this.State + ", " + this.country;
                        return [2 /*return*/, apiData];
                }
            });
        });
    };
    return CurrentLocation;
}());
var TemperatureUnit = /** @class */ (function () {
    function TemperatureUnit() {
        this.temperatureValue = 'Celsius';
        this.tempratueUnit = 'm';
        this.temperatureSelect();
    }
    TemperatureUnit.prototype.temperatureUnitIndex = function () {
        var tempratureUnitString = document.getElementById("dropdown1");
        var index;
        for (index = 0; index < tempratureUnitString.options.length; index++) {
            if (tempratureUnitString.options[index].selected === true) {
                break;
            }
        }
        return index;
    };
    TemperatureUnit.prototype.temperatureSelect = function () {
        var index = this.temperatureUnitIndex();
        if (index === 0) {
            this.tempratueUnit = 'm';
            this.temperatureValue = "Celsius";
        }
        else if (index === 1) {
            this.tempratueUnit = 's';
            this.temperatureValue = "Kelvin";
        }
        else if (index === 2) {
            this.tempratueUnit = 'f';
            this.temperatureValue = "fahrenheit";
        }
    };
    return TemperatureUnit;
}());
var weather = /** @class */ (function (_super) {
    __extends(weather, _super);
    // temperatureValue: string = "Celsius";
    function weather() {
        var _this = _super.call(this) || this;
        _this.temperature = document.getElementById("temperature");
        _this.description = document.getElementById("description");
        _this.weatherImage = document.getElementById("imge");
        _this.locate = (document.getElementById("place").value);
        _this.textBoxLocation = document.getElementById("name");
        _this.wind = document.getElementById("wind");
        _this.pressure = document.getElementById("pressure");
        _this.humid = document.getElementById("humid");
        return _this;
        // this.unit = tempratueUnit;
    }
    weather.prototype.findLoactionData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, respond, weatherData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('http://api.weatherstack.com/current?access_key=a512b5255a5f4e11735e8cf7ebb61229&query=' + this.locate + '&units=' + this.tempratueUnit)];
                    case 1:
                        respond = _a.sent();
                        return [4 /*yield*/, (respond.json())];
                    case 2:
                        data = _a.sent();
                        weatherData = new WeatherStackApi(data) // data mapping 
                        ;
                        console.log(data);
                        this.description.innerHTML = "It's " + weatherData.weatherDescription; //put data in tags
                        this.textBoxLocation.innerHTML = "your state is  " + weatherData.Location;
                        this.temperature.innerHTML = "Temp => " + weatherData.temperature + " " + this.temperatureValue;
                        this.wind.innerHTML = "wind speed => " + weatherData.windSpeed + " Kilometers/Hour";
                        this.pressure.innerHTML = "wind pressure => " + weatherData.pressure + " Millibar";
                        this.humid.innerHTML = "humidity =>   " + weatherData.humidity;
                        this.weatherImage.src = weatherData.waeatherImage;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return weather;
}(TemperatureUnit));
var FutureDate = /** @class */ (function () {
    function FutureDate() {
    }
    FutureDate.prototype.getFutureDate = function (addDay) {
        var today = new Date();
        var dd = today.getDate();
        today.setDate(today.getDate() + addDay);
        dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        return (dd + "-" + mm + "-" + yyyy);
    };
    ;
    return FutureDate;
}());
var forcast = /** @class */ (function () {
    function forcast() {
        this.currentLocation = new weather();
        this.dateSet = new FutureDate();
    }
    forcast.prototype.findCurrentLocation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var respond, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('http://api.weatherstack.com/current?access_key=a512b5255a5f4e11735e8cf7ebb61229&query=' + this.currentLocation.locate + '&units=' + this.currentLocation.tempratueUnit)];
                    case 1:
                        respond = _a.sent();
                        return [4 /*yield*/, (respond.json())];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, new WeatherStackApi(data)];
                }
            });
        });
    };
    forcast.prototype.forcastWeather = function () {
        return __awaiter(this, void 0, void 0, function () {
            var weatherData, setDate, res, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.findCurrentLocation()];
                    case 1:
                        weatherData = _b.sent();
                        return [4 /*yield*/, fetch("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/38cf82d8f8bd31f46313477dd41f36d5/" + weatherData.latitude + "," + weatherData.longitude)];
                    case 2:
                        res = _b.sent();
                        _a = this;
                        return [4 /*yield*/, (res.json())];
                    case 3:
                        _a.foreCastData = _b.sent();
                        document.getElementById("tommorow").innerHTML = "tommorow";
                        for (setDate = 1; setDate < 6; setDate++) // setting future dates on the button tags 
                         {
                            document.getElementById("today" + setDate).innerHTML = this.dateSet.getFutureDate(setDate + 1);
                        }
                        this.dateForecast();
                        return [2 /*return*/, this.foreCastData];
                }
            });
        });
    };
    forcast.prototype.dateForecast = function () {
        var iterate, index;
        var minimumTemperature;
        var maximumTEmperature;
        var windSpeed;
        var ForecastIcon;
        index = new TemperatureUnit().temperatureUnitIndex();
        for (iterate = 1; iterate < 7; iterate++) {
            ForecastIcon = "https://darksky.net/images/weather-icons/" + this.foreCastData["daily"]["data"][iterate]["icon"] + ".png";
            minimumTemperature = this.foreCastData["daily"]["data"][iterate]["temperatureMin"];
            maximumTEmperature = this.foreCastData["daily"]["data"][iterate]["temperatureMax"];
            windSpeed = this.foreCastData["daily"]["data"][iterate]["windSpeed"];
            document.getElementById("icon" + iterate).src = ForecastIcon;
            document.getElementById("summery" + iterate).innerHTML = "summery :- " + this.foreCastData["daily"]["data"][iterate]["summary"];
            if (index < 2) {
                document.getElementById("mintemp" + iterate).innerHTML = "minimum temperature:-   " + this.convert(minimumTemperature) + " celsius";
                document.getElementById("maxtemp" + iterate).innerHTML = "maximum temperature:-    " + this.convert(maximumTEmperature) + " celsius";
            }
            else {
                document.getElementById("mintemp" + iterate).innerHTML = "minimum temperature:- " + minimumTemperature + " fahrenheit";
                document.getElementById("maxtemp" + iterate).innerHTML = "maximum temperature:- " + maximumTEmperature + " fahrenheit";
                console.log("ferenheit");
            }
            document.getElementById("ws" + iterate).innerHTML = "Wind speed :- " + windSpeed + " Kilometers/Hour";
        }
    };
    forcast.prototype.convert = function (degree) {
        return ((degree - 32) * 5 / 9).toFixed(2);
    };
    return forcast;
}());
