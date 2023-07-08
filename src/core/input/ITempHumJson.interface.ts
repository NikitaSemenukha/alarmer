import { statusTempAndHum } from "./status.type";

export interface ITempHumJson {
    temperature: number,
    humidity: number,
    temperatureStatus: statusTempAndHum,
    humidityStatus: statusTempAndHum,
    createdAt: Date
}