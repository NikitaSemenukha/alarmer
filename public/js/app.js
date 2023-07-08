let historyInterval;

function updateHistoryCharts() {
    clearInterval(realtimeInterval);

    axios.get('api/data?mode=history')
        .then(response => {
            const data = response.data;

            if (!temperatureChart) {
                initCharts();
            }

            updateCharts(data);
        })
        .catch(error => {
            console.log(error);
            // Обработка ошибки
        });
}

function updateRealtimeCharts() {
    clearInterval(historyInterval);

    realtimeInterval = setInterval(async () => {
        try {
            const response = await axios.get('api/data?mode=latest');
            const data = response.data;

            if (!temperatureChart) {
                initCharts();
            }

            updateCharts(data);
        } catch (error) {
            console.log(error);
            // Обработка ошибки
        }
    }, 5000);
}

document.getElementById('chart-type-select').addEventListener('change', function () {
    const selectedValue = this.value;

    if (selectedValue === 'realtime') {
        updateRealtimeCharts();
    } else if (selectedValue === 'history') {
        updateHistoryCharts();
    }
});

updateRealtimeCharts();
