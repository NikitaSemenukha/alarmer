import { ITempOrHym } from "./TempOrHym.interface";

/**

Generates a random value for temperature or humidity.
@param tempOrHum The type of data to generate (temperature or humidity).
@returns The generated value.
*/

export function generateTempOrHumidity(tempOrHum: ITempOrHym): number {
    if (tempOrHum === 'temperature') {
        return Math.floor(Math.random() * 10) + 1;
    } else {
        return Math.floor(Math.random() * 100) + 1;
    }
}