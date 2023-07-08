// Глобальные переменные для хранения данных и графиков
let temperatureData = [];
let humidityData = [];
let temperatureChart, humidityChart;

function initCharts() {
    if (temperatureChart) {
        temperatureChart.destroy();
    }
    if (humidityChart) {
        humidityChart.destroy();
    }

    const temperatureCtx = document.getElementById('temperature-chart').getContext('2d');
    temperatureChart = new Chart(temperatureCtx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Temperature',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                fill: true,
                data: temperatureData
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                line: {
                    tension: 0 // Отключаем сглаживание линии
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    display: false // Скрываем метки времени на оси x
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const humidityCtx = document.getElementById('humidity-chart').getContext('2d');
    humidityChart = new Chart(humidityCtx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Humidity',
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                fill: true,
                data: humidityData
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                line: {
                    tension: 0 // Отключаем сглаживание линии
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    display: false // Скрываем метки времени на оси x
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateCharts(data) {
    if (Array.isArray(data)) {
        // Обновление данных для графика History
        temperatureData = [];
        humidityData = [];

        for (let i = 0; i < data.length; i++) {
            const temperature = data[i].temperature;
            const humidity = data[i].humidity;
            const timestamp = new Date(data[i].createdAt).getTime();

            temperatureData.push({
                x: timestamp,
                y: temperature
            });

            humidityData.push({
                x: timestamp,
                y: humidity
            });
        }

        const maxDataPoints = 100;
        if (temperatureData.length > maxDataPoints) {
            temperatureData = temperatureData.slice(temperatureData.length - maxDataPoints);
        }
        if (humidityData.length > maxDataPoints) {
            humidityData = humidityData.slice(humidityData.length - maxDataPoints);
        }

        temperatureChart.data.datasets[0].data = temperatureData;
        humidityChart.data.datasets[0].data = humidityData;
        temperatureChart.update();
        humidityChart.update();
    } else {
        // Обновление данных для графика Real-Time
        const temperature = data.temperature;
        const humidity = data.humidity;
        const timestamp = Date.now();

        temperatureData.push({
            x: timestamp,
            y: temperature
        });

        humidityData.push({
            x: timestamp,
            y: humidity
        });

        const maxDataPoints = 100;
        if (temperatureData.length > maxDataPoints) {
            temperatureData.shift();
        }
        if (humidityData.length > maxDataPoints) {
            humidityData.shift();
        }

        temperatureChart.update();
        humidityChart.update();
    }
}
