// Global variables for storing data and charts
let temperatureData = [];
let humidityData = [];
let temperatureChart, humidityChart;

function initCharts() {
    // Destroy existing charts, if any
    if (temperatureChart) {
        temperatureChart.destroy();
    }
    if (humidityChart) {
        humidityChart.destroy();
    }

    // Create the temperature chart
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
                    tension: 0 // Disable line smoothing
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    display: false // Hide time labels on the x-axis
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Create the humidity chart
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
                    tension: 0 // Disable line smoothing
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    display: false // Hide time labels on the x-axis
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
        // Update data for the History chart
        temperatureData = [];
        humidityData = [];

        // Iterate through each data item and add them to the chart data arrays
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

        // Limit the number of data points for the charts
        const maxDataPoints = 100;
        if (temperatureData.length > maxDataPoints) {
            temperatureData = temperatureData.slice(temperatureData.length - maxDataPoints);
        }
        if (humidityData.length > maxDataPoints) {
            humidityData = humidityData.slice(humidityData.length - maxDataPoints);
        }

        // Update the chart data and update the charts
        temperatureChart.data.datasets[0].data = temperatureData;
        humidityChart.data.datasets[0].data = humidityData;
        temperatureChart.update();
        humidityChart.update();
    } else {
        // Update data for the Real-Time chart
        const temperature = data.temperature;
        const humidity = data.humidity;
        const timestamp = Date.now();

        // Add new data to the chart data arrays
        temperatureData.push({
            x: timestamp,
            y: temperature
        });

        humidityData.push({
            x: timestamp,
            y: humidity
        });

        // Limit the number of data points for the charts
        const maxDataPoints = 100;
        if (temperatureData.length > maxDataPoints) {
            temperatureData.shift();
        }
        if (humidityData.length > maxDataPoints) {
            humidityData.shift();
        }

        // Update the charts
        temperatureChart.update();
        humidityChart.update();
    }
}
