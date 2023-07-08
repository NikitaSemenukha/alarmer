let historyInterval;

// Function to update the history charts
function updateHistoryCharts() {
    // Clear the interval for real-time updates
    clearInterval(realtimeInterval);

    // Make a GET request to retrieve historical data
    axios.get('api/data?mode=history')
        .then(response => {
            const data = response.data;

            // Initialize the charts if they don't exist
            if (!temperatureChart) {
                initCharts();
            }

            // Update the charts with the retrieved data
            updateCharts(data);
        })
        .catch(error => {
            console.log(error);
            // Error handling
        });
}

// Function to update the real-time charts
function updateRealtimeCharts() {
    // Clear the interval for history updates
    clearInterval(historyInterval);

    // Set up an interval to periodically retrieve the latest data
    realtimeInterval = setInterval(async () => {
        try {
            const response = await axios.get('api/data?mode=latest');
            const data = response.data;

            // Initialize the charts if they don't exist
            if (!temperatureChart) {
                initCharts();
            }

            // Update the charts with the latest data
            updateCharts(data);
        } catch (error) {
            console.log(error);
            // Error handling
        }
    }, 5000);
}

// Event listener for the change event of the chart type select element
document.getElementById('chart-type-select').addEventListener('change', function () {
    const selectedValue = this.value;

    if (selectedValue === 'realtime') {
        updateRealtimeCharts();
    } else if (selectedValue === 'history') {
        updateHistoryCharts();
    }
});

// Start the real-time chart updates
updateRealtimeCharts();
