import { getTempAndHum } from "../file/getTempAndHum";
import { ITempHumJson } from "../input/ITempHumJson.interface";
import { statusTempAndHum } from "../input/status.type";
import {sendAlarmMessage} from "../gsm/gsm"

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
        if (temperature > 29 || temperature < 13) {
            sendAlarmMessage('Alarm: Temperature is outside normal bounds!');
            return 'critical';
        } else if (temperature > 24 || temperature < 18) {
            return 'pre-critical';
        } else {
            return 'normal';
        }
    }

    getHumidityStatus(humidity: number): statusTempAndHum {
        // Determine the humidity status based on the humidity value
        if (humidity > 65 || humidity < 35) {
            sendAlarmMessage('Alarm: Humidity is outside normal bouds!');
            return 'critical';
        } else if (humidity > 60 || humidity < 40) {
            return 'pre-critical';
        } else {
            return 'normal';
        }
    }
}
