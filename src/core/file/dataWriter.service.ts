import fs from 'fs';

export class DataWriter {
    private dataArray: any[];

    constructor() {
        this.dataArray = [];
    }

    writeDataToFile(data: any) {
        this.dataArray.push(data); // Add the data to the array

        const jsonData = JSON.stringify(this.dataArray, null, 2);
        const formattedData = jsonData.replace(/\}\,/g, '},\n');

        fs.writeFile('data.json', formattedData, (err) => {
            if (err) {
                console.error('Ошибка при записи данных в файл:', err);
            } else {
                console.log('Данные успешно записаны в файл data.json');
            }
        });
    }
}

