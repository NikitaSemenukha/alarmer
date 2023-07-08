// dataWriter.service.ts
import fs from 'fs';

/**
 * Class responsible for writing data to a file.
 */
export class DataWriter {
    private dataArray: any[];

    /**
     * Constructs a new instance of DataWriter.
     */
    constructor() {
        this.dataArray = [];
    }

    /**
     * Writes data to a file.
     * @param data The data to be written.
     */
    writeDataToFile(data: any) {
        this.dataArray.push(data); // Add the data to the array

        const jsonData = JSON.stringify(this.dataArray, null, 2);
        const formattedData = jsonData.replace(/\}\,/g, '},\n');

        fs.writeFile('data.json', formattedData, (err) => {
            if (err) {
                console.error('Error writing data to file:', err);
            } else {
                console.log('Data successfully written to data.json');
            }
        });
    }
}
