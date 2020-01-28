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
        // while( this.dataa !== 'undefined');
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
var weather = /** @class */ (function () {
    function weather(temperatureInitials) {
        if (temperatureInitials === void 0) { temperatureInitials = 'f'; }
        this.temperatureValue = "Celsius";
        this.temperature = document.getElementById("temperature");
        this.description = document.getElementById("description");
        this.weatherImage = document.getElementById("imge");
        this.locate = (document.getElementById("place").value);
        this.textBoxLocation = document.getElementById("name");
        this.wind = document.getElementById("wind");
        this.pressure = document.getElementById("pressure");
        this.humid = document.getElementById("humid");
        this.unit = temperatureInitials;
    }
    weather.prototype.temperatureUnitIndex = function () {
        var x = document.getElementById("dropdown1");
        var index;
        for (index = 0; index < x.options.length; index++) {
            if (x.options[index].selected === true) {
                break;
            }
        }
        return index;
    };
    weather.prototype.temperature_unit = function () {
        var index = this.temperatureUnitIndex();
        if (index === 0) {
            this.unit = 'm';
            this.temperatureValue = "Celsius";
        }
        else if (index === 1) {
            this.unit = 's';
            this.temperatureValue = "Kelvin";
        }
        else if (index === 2) {
            this.unit = 'f';
            this.temperatureValue = "fahrenheit";
        }
        this.find();
    };
    weather.prototype.current_loc = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        }
        else {
            document.getElementById("long").innerHTML = "not supporting browser";
        }
    };
    weather.prototype.showPosition = function (position) {
        return __awaiter(this, void 0, void 0, function () {
            var locapi, res, country, data, weatherData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(position.coords.latitude, " direction ", position.coords.longitude);
                        return [4 /*yield*/, fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=dba730857b382622664ad9914d2b7304')];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, (res.json())];
                    case 2:
                        data = _a.sent();
                        weatherData = new OpenWeatherApi(data);
                        this.locate = weatherData.name;
                        country = weatherData.country;
                        console.log("runninj");
                        document.getElementById("place").value = this.locate + ", " + country;
                        this.find();
                        return [2 /*return*/];
                }
            });
        });
    };
    weather.prototype.find = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, respond, weatherData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('http://api.weatherstack.com/current?access_key=c55132a6234cad11948e6cd8a696ef04&query=' + this.locate + '&units=' + this.unit)];
                    case 1:
                        respond = _a.sent();
                        return [4 /*yield*/, (respond.json())];
                    case 2:
                        data = _a.sent();
                        weatherData = new WeatherStackApi(data);
                        console.log(data);
                        {
                            this.description.innerHTML = "It's " + weatherData.weatherDescription;
                            ;
                            this.textBoxLocation.innerHTML = "your state is  " + weatherData.Location;
                            this.temperature.innerHTML = "Temp => " + weatherData.temperature + " " + this.temperatureValue;
                            this.wind.innerHTML = "wind speed => " + weatherData.windSpeed + " Kilometers/Hour";
                            this.pressure.innerHTML = "wind pressure => " + weatherData.pressure + " Millibar";
                            this.humid.innerHTML = "humidity =>   " + weatherData.humidity;
                            this.weatherImage.src = weatherData.waeatherImage;
                            return [2 /*return*/, data];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return weather;
}());
var forcast = /** @class */ (function (_super) {
    __extends(forcast, _super);
    function forcast() {
        var _this = _super.call(this) || this;
        _this.latitude = 0;
        _this.longitude = 0;
        return _this;
    }
    forcast.prototype.find_data = function () {
        return __awaiter(this, void 0, void 0, function () {
            var respond, data, weatherData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('http://api.weatherstack.com/current?access_key=c55132a6234cad11948e6cd8a696ef04&query=' + this.locate + '&units=' + this.unit)];
                    case 1:
                        respond = _a.sent();
                        return [4 /*yield*/, (respond.json())];
                    case 2:
                        data = _a.sent();
                        weatherData = new WeatherStackApi(data);
                        this.latitude = weatherData.latitude;
                        this.longitude = weatherData.longitude;
                        console.log(this.latitude, this.longitude);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    forcast.prototype.forcast_weather = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.find_data()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, fetch("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/38cf82d8f8bd31f46313477dd41f36d5/" + this.latitude + "," + this.longitude)];
                    case 2:
                        res = _b.sent();
                        _a = this;
                        return [4 /*yield*/, (res.json())];
                    case 3:
                        _a.forCastData = _b.sent();
                        // (document.getElementById("today") as HTMLElement).innerHTML = "today";
                        document.getElementById("tommorow").innerHTML = "tommorow";
                        document.getElementById("today1").innerHTML = this.curday(2);
                        document.getElementById("today2").innerHTML = this.curday(3);
                        document.getElementById("today3").innerHTML = this.curday(4);
                        document.getElementById("today4").innerHTML = this.curday(5);
                        document.getElementById("today5").innerHTML = this.curday(6);
                        this.date_fcast();
                        return [2 /*return*/];
                }
            });
        });
    };
    forcast.prototype.curday = function (addDay) {
        var today = new Date();
        var dd = today.getDate();
        dd = dd + addDay;
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        return (dd + "-" + mm + "-" + yyyy);
    };
    ;
    forcast.prototype.date_fcast = function () {
        var i, index;
        var val;
        var min_temp;
        var max_temp;
        var unit = this.unit;
        var windSpeed;
        var icon;
        index = this.temperatureUnitIndex();
        for (i = 1; i < 7; i++) {
            icon = "https://darksky.net/images/weather-icons/" + this.forCastData["daily"]["data"][i]["icon"] + ".png";
            min_temp = this.forCastData["daily"]["data"][i]["temperatureMin"];
            max_temp = this.forCastData["daily"]["data"][i]["temperatureMax"];
            windSpeed = this.forCastData["daily"]["data"][i]["windSpeed"];
            document.getElementById("icon" + i).src = icon;
            document.getElementById("summery" + i).innerHTML = "summery :- " + this.forCastData["daily"]["data"][i]["summary"];
            if (index < 2) {
                document.getElementById("mintemp" + i).innerHTML = "minimum temperature:-   " + this.convert(min_temp) + " celsius";
                document.getElementById("maxtemp" + i).innerHTML = "maximum temperature:-    " + this.convert(max_temp) + " celsius";
            }
            else {
                document.getElementById("mintemp" + i).innerHTML = "minimum temperature:- " + min_temp + " fahrenheit";
                document.getElementById("maxtemp" + i).innerHTML = "maximum temperature:- " + max_temp + " fahrenheit";
                console.log("ferenheit");
            }
            document.getElementById("ws" + i).innerHTML = "Wind speed :- " + windSpeed + " Kilometers/Hour";
        }
    };
    forcast.prototype.convert = function (degree) {
        return ((degree - 32) * 5 / 9).toFixed(2);
    };
    return forcast;
}(weather));
