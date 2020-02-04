export class TemperatureUnit {
    temperatureValue: string = 'Celsius';
    tempratueUnit: string = 'm';

    constructor() {
        this.setTemperatureUnit();
    }

    getTemperatureUnitIndex() {
        let tempratureUnitString = document.getElementById("dropdown1") as HTMLSelectElement;
        let index;
        for (index = 0; index < tempratureUnitString.options.length; index++) {
            if (tempratureUnitString.options[index].selected === true) {
                break
            }
        }
        return index;

    }

    setTemperatureUnit() {

        const index = this.getTemperatureUnitIndex();

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


(<any>window).TemperatureUnit = TemperatureUnit