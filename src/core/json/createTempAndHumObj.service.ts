import { generateTempOrHumidity } from "../file/generateTempOrHum.value";
import { ITempHumJson } from "../input/ITempHumJson.interface";
import { statusTempAndHum } from "../input/status.type";

export class DataUpdater {

    updateData(): ITempHumJson {
        const temperature = generateTempOrHumidity('temperature');
        const humidity = generateTempOrHumidity('humidity');

        const temperatureStatus = this.getTemperatureStatus(temperature);
        const humidityStatus = this.getHumidityStatus(humidity);

        const newData: ITempHumJson = {
            temperature: generateTempOrHumidity('temperature'),
            humidity: generateTempOrHumidity('humidity'),
            temperatureStatus: this.getTemperatureStatus(temperature),
            humidityStatus: humidityStatus,
            createdAt: new Date()
        };

        return newData;
    }

    getTemperatureStatus(temperature: number): statusTempAndHum {
        if (temperature > 50) {
            return 'critical';
        } else if (temperature >= 35 && temperature <= 50) {
            return 'pre-critical';
        } else {
            return 'normal';
        }
    }

    getHumidityStatus(humidity: number): statusTempAndHum {
        if (humidity > 70) {
            return 'critical';
        } else if (humidity >= 40 && humidity <= 70) {
            return 'pre-critical';
        } else {
            return 'normal';
        }
    }
}
