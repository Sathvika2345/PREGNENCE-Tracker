let vitalsChart;

function updateCharts() {
    const vitals = JSON.parse(localStorage.getItem('vitals') || '[]');
    
    // Sort by date
    vitals.sort((a, b) => new Date(a.date) - new Date(b.date));

    const dates = vitals.map(v => new Date(v.date).toLocaleDateString());
    const systolic = vitals.map(v => v.systolic);
    const diastolic = vitals.map(v => v.diastolic);
    const heartRates = vitals.map(v => v.heartRate);
    const weights = vitals.map(v => v.weight);

    if (vitalsChart) {
        vitalsChart.destroy();
    }

    const ctx = document.getElementById('vitalsChart').getContext('2d');
    vitalsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Systolic BP',
                    data: systolic,
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1
                },
                {
                    label: 'Diastolic BP',
                    data: diastolic,
                    borderColor: 'rgb(54, 162, 235)',
                    tension: 0.1
                },
                {
                    label: 'Heart Rate',
                    data: heartRates,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                },
                {
                    label: 'Weight',
                    data: weights,
                    borderColor: 'rgb(153, 102, 255)',
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Vitals Trend'
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}
