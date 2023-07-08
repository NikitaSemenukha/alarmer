import { ITempOrHym } from "./TempOrHym.interface";

export function generateTempOrHumidity(tempOrHum: ITempOrHym): number {
    if (tempOrHum === 'temperature') {
        return Math.floor(Math.random() * 10) + 1;
    } else {
        return Math.floor(Math.random() * 100) + 1;
    }
}