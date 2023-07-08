import express from 'express';
import path from 'path';
import { getData } from './core/controllers/api/API.controller';
import { getCharts } from './core/controllers/charts/charts.controller';
import { dataHandler } from './core/handlers/dataHandler.handler';
import { dataWriter } from './core/handlers/dataWriter.handler';

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Define routes
app.get('/api/data', getData);
app.get('/charts', getCharts);

// Periodically write the latest data to a file
setInterval(() => {
    const latestData = dataHandler.getLatestData();
    dataWriter.writeDataToFile(latestData);
}, 5000);

// Start the server
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
