document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather icons
    feather.replace();

    // Initialize Bootstrap modal
    const addVitalsModal = new bootstrap.Modal(document.getElementById('addVitalsModal'));
    
    // Show modal when Add Vitals button is clicked
    document.getElementById('addVitalsBtn').addEventListener('click', () => {
        addVitalsModal.show();
    });

    // Handle form submission
    document.getElementById('vitalsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const vitals = {
            date: new Date().toISOString(),
            systolic: parseInt(document.getElementById('systolic').value),
            diastolic: parseInt(document.getElementById('diastolic').value),
            heartRate: parseInt(document.getElementById('heartRate').value),
            weight: parseFloat(document.getElementById('weight').value),
            babyKicks: parseInt(document.getElementById('babyKicks').value)
        };

        // Validate input
        if (!validateVitals(vitals)) {
            alert('Please check your input values');
            return;
        }

        // Save to local storage
        saveVitals(vitals);
        
        // Update UI
        updateVitalsTable();
        updateCharts();
        
        // Close modal and reset form
        addVitalsModal.hide();
        e.target.reset();
    });

    // Initial load
    updateVitalsTable();
    updateCharts();
});

function validateVitals(vitals) {
    return (
        vitals.systolic >= 70 && vitals.systolic <= 190 &&
        vitals.diastolic >= 40 && vitals.diastolic <= 100 &&
        vitals.heartRate >= 40 && vitals.heartRate <= 200 &&
        vitals.weight > 0 &&
        vitals.babyKicks >= 0
    );
}

function saveVitals(vitals) {
    let storedVitals = JSON.parse(localStorage.getItem('vitals') || '[]');
    storedVitals.push(vitals);
    localStorage.setItem('vitals', JSON.stringify(storedVitals));
}

function updateVitalsTable() {
    const vitals = JSON.parse(localStorage.getItem('vitals') || '[]');
    const tbody = document.getElementById('vitalsTableBody');
    tbody.innerHTML = '';

    vitals.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(vital => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(vital.date).toLocaleDateString()}</td>
            <td>${vital.systolic}/${vital.diastolic}</td>
            <td>${vital.heartRate}</td>
            <td>${vital.weight}</td>
            <td>${vital.babyKicks}</td>
        `;
        tbody.appendChild(row);
    });
}
