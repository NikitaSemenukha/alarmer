import { getTempAndHum } from "../file/getTempAndHum";
import { ITempHumJson } from "../input/ITempHumJson.interface";
import { statusTempAndHum } from "../input/status.type";

export class DataUpdater {

    async updateData(): Promise<ITempHumJson> {
        return new Promise(async(resolve, reject) => {
            const retValues = await getTempAndHum();

            const temperature = retValues[1];
            const humidity = retValues[0]

            // Get the status based on the generated values
            const temperatureStatus = this.getTemperatureStatus(temperature);
            const humidityStatus = this.getHumidityStatus(humidity);

        // Create a new object with the updated data and status
            const newData: ITempHumJson = {
            temperature: temperature,
            humidity: humidity,
            temperatureStatus: temperatureStatus,
            humidityStatus: humidityStatus,
            createdAt: new Date()
            };

            resolve(newData);
        });
    }

    getTemperatureStatus(temperature: number): statusTempAndHum {
        // Determine the temperature status based on the temperature value
        if (temperature > 50) {
            return 'critical';
        } else if (temperature >= 35 && temperature <= 50) {
            return 'pre-critical';
        } else {
            return 'normal';
        }
    }

    getHumidityStatus(humidity: number): statusTempAndHum {
        // Determine the humidity status based on the humidity value
        if (humidity > 70) {
            return 'critical';
        } else if (humidity >= 40 && humidity <= 70) {
            return 'pre-critical';
        } else {
            return 'normal';
        }
    }
}
