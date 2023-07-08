import express from 'express';
import path from 'path';
import { getData } from './core/controllers/api/API.controller';
import { getCharts } from './core/controllers/charts/charts.controller';
import { dataHandler } from './core/handlers/dataHandler.handler';
import { dataWriter } from './core/handlers/dataWriter.handler';

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/data', getData);
app.get('/charts', getCharts);

setInterval(() => {
    const latestData = dataHandler.getLatestData();
    dataWriter.writeDataToFile(latestData);
}, 5000);

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
