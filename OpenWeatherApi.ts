
export class OpenWeatherApi {
    name: string;
    country: string;

    constructor(data : any) {
        this.name = data.name;
        this.country = data.sys.country;

    }
}
(<any>window).OpenWeatherApi = OpenWeatherApi